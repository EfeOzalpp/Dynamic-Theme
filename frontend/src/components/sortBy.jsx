import React, { useState, useRef, useEffect } from 'react';
import fetchImages from '../lib/fetchUser';
import '../styles/sortByStyles.css';

const options = [
  { value: 'random', label: 'Randomized' },
  { value: 'titleAsc', label: 'A to Z' },
  { value: 'titleDesc', label: 'Z to A' },
];

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function SortBy({ setSortOption, onFetchItems, customArrowIcon, colorMapping }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('random');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setSortOption(value);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    // Check if the click is outside the dropdown and PauseButton
    const pauseButtonElement = document.querySelector('.lottie-container');
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      (!pauseButtonElement || !pauseButtonElement.contains(event.target))
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let fetchedItems = await fetchImages(selectedValue);
        if (selectedValue === 'random') {
          fetchedItems = shuffleArray(fetchedItems);
        } else if (selectedValue === 'titleAsc') {
          fetchedItems.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedValue === 'titleDesc') {
          fetchedItems.sort((a, b) => b.title.localeCompare(a.title));
        }
        setItems(fetchedItems);
        onFetchItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedValue, onFetchItems]);

  // Determine screen width
  const screenWidth = window.innerWidth;

  // Use the third item's colors if on a large screen (1024px and above)
  const ItemIndex = screenWidth >= 1025 ? 2 : (screenWidth >= 768 ? 1 : 0);

  const convertHexToRGBA = (hex, alpha) => {
    // Remove '#' if present
    const hexWithoutHash = hex.replace('#', '');
  
    // Split the hex into RGB components
    const r = parseInt(hexWithoutHash.slice(0, 2), 16);
    const g = parseInt(hexWithoutHash.slice(2, 4), 16);
    const b = parseInt(hexWithoutHash.slice(4, 6), 16);
  
    // Return RGBA format
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  // Add alpha 0.6 to borderItemColor
  const borderItemColor = items.length > ItemIndex
    ? (Array.isArray(colorMapping[items[ItemIndex]?.alt1])
        ? convertHexToRGBA(colorMapping[items[ItemIndex]?.alt1][2], 0.4) // Apply alpha to instance 2
        : convertHexToRGBA(colorMapping[items[ItemIndex]?.alt1], 0.4)) || 'rgba(255, 255, 255, 0.4)'
    : 'rgba(255, 255, 255, 0.4)'; // Default to white with alpha
  
  const boxShadowItemColor = items.length > ItemIndex
    ? (Array.isArray(colorMapping[items[ItemIndex]?.alt1])
        ? colorMapping[items[ItemIndex]?.alt1][3] // Instance 3 remains unchanged
        : colorMapping[items[ItemIndex]?.alt1]) || '#fff'
    : '#fff';

  return (
    <div className="sort-by-container">
      <div className="sort-container">
        <label htmlFor="sort"><p>Sort by:</p></label>
      </div>
      <div className="sort-container2">
        <div
          className="custom-dropdown"
          ref={dropdownRef}
          style={{
            border: `solid 1.6px ${borderItemColor}`,
            boxShadow: `0 1px 8px rgba(0, 0, 0, 0.1), 0 22px 8px rgba(0, 0, 0, 0.08), 16px 12px ${boxShadowItemColor}`
          }}
        >
          <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
            <div className="selected-value">
              <h5>{options.find(option => option.value === selectedValue).label}</h5>
            </div>
            <span className={`custom-arrow ${isOpen ? 'open' : ''}`}>
              {customArrowIcon && <div dangerouslySetInnerHTML={{ __html: customArrowIcon }} />}
            </span>
          </div>
          {isOpen && (
            <div className="options-container"
              style={{
                border: `solid 1.6px ${borderItemColor}`,
                borderTop: `none`,
              }}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`option ${option.value === selectedValue ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SortBy;
