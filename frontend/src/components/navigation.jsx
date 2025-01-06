import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import fetchGallery from '../lib/fetchGallery'; // Handles fetching and randomization for gallery images
import '../styles/navigation.css'; // Navigation Items Styles Import

const Navigation = ({ activeColor, customArrowIcon, customArrowIcon2 }) => {
  const [isOpen, setIsOpen] = useState(false); // Navigation menu Open & Close state controls
  const [lastScrollY, setLastScrollY] = useState(0); // Logic for detecting when page hasn't been scrolled versus scrolled
  const [isScrollingUp, setIsScrollingUp] = useState(true);  // Hide Navigation Menu when Scroll down and reveal it when scrolling up
  const [isScrolled, setIsScrolled] = useState(false); // Remove visibility of Background Color for Navigation when at top
  const [galleryImages, setGalleryImages] = useState([]); // Will hold the images from fetchGallery
  const [showScrollHint, setShowScrollHint] = useState(false); // Control the visibility of the scroll hint
  const [hasShownScrollHint, setHasShownScrollHint] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev); // Toggle logic
  const handleCloseMenu = () => setIsOpen(false); 

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsScrollingUp(currentScrollY < lastScrollY);
    setIsScrolled(currentScrollY > window.innerHeight * 0.1); // Scrolled more than 10% of viewport
    setLastScrollY(currentScrollY);
  };

  // useEffect React state dependent UI Below
  //Respectively
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Disable scrolling when the menu is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', isOpen);
    return () => document.body.classList.remove('no-scroll'); // Toggles a css class with no scroll styling
  }, [isOpen]);

  // Fetch gallery images on mount using fetchGallery
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await fetchGallery(); // Directly call fetchGallery
        setGalleryImages(images); // Set the fetched images to state
      } catch (error) {
        console.error('Error fetching gallery images:', error); // Error alert
      }
    };
    fetchImages(); // Invoke the fetch function
  }, []); // Empty dependency array to fetch only once

  // Horizontal scrolling behavior for Desktop devices
  useEffect(() => {
    if (window.innerWidth > 1024) { // Apply only for screen sizes above 1024px
      const galleryContainer = document.querySelector('.image-container-g');
      const handleHorizontalScroll = (e) => {
        if (galleryContainer) {
          e.preventDefault(); // Prevent default vertical scrolling
          galleryContainer.scrollLeft += e.deltaY; // Map vertical scroll to horizontal
        }
      };
      if (galleryContainer) {
        galleryContainer.addEventListener('wheel', handleHorizontalScroll);
      }
      return () => {
        if (galleryContainer) {
          galleryContainer.removeEventListener('wheel', handleHorizontalScroll);
        }
      };
    }
  }, []); // Runs once on mount 
  
  // Scroll progress bar
  useEffect(() => {
    const gallery = document.querySelector('.image-container-g'); // Target the gallery
    const scrollIndicator = document.querySelector('.scroll-indicator'); // Progress bar container
  
    if (!gallery || !scrollIndicator) {
      return;
    }
  
    const updateScrollIndicator = () => {
      if (window.innerWidth > 1024) {
        // Horizontal scroll logic for screens above 1024px
        const scrollWidth = gallery.scrollWidth - gallery.clientWidth; // Total scrollable width
        const scrollLeft = gallery.scrollLeft; // Current scroll position
        const percentage = scrollWidth > 0 ? Math.max(2, (scrollLeft / scrollWidth) * 100) : 2; // Avoid NaN
        scrollIndicator.style.setProperty('--progress-dimension', `${percentage}%`);
      } else {
        // Vertical scroll logic for screens below 1024px
        const scrollHeight = gallery.scrollHeight - gallery.clientHeight; // Total scrollable height
        const scrollTop = gallery.scrollTop; // Current scroll position

        if (scrollHeight > 0) {
          // Calculate normal progress
          const normalPercentage = 100 - (scrollTop / scrollHeight) * 100;
          const reversedPercentage = Math.min(100, Math.max(2, 100 - normalPercentage));
          // Set the reversed progress as the CSS variable
          scrollIndicator.style.setProperty('--progress-dimension', `${reversedPercentage}%`);
        } else {
          // Default to 2% if no scrolling is possible
          scrollIndicator.style.setProperty('--progress-dimension', '2%');
        }
      }
    };
  
    // Initialize progress bar on mount
    updateScrollIndicator();
  
    // Add scroll listener
    gallery.addEventListener('scroll', updateScrollIndicator);
  
    // Cleanup listener
    return () => {
      gallery.removeEventListener('scroll', updateScrollIndicator);
    };
  }, []);  
   
  // Scroll Hint Visibility Control
  useEffect(() => {
    if (isOpen && !hasShownScrollHint) { // Only show if not already shown
      setShowScrollHint(true);

      const fadeOutTimeout = setTimeout(() => {
        const hintElement = document.querySelector('.scroll-hint');
        if (hintElement) {
          hintElement.style.opacity = '0'; // Start fade-out
        }
      }, 3000);

      const removeTimeout = setTimeout(() => {
        setShowScrollHint(false); // Completely hide
        setHasShownScrollHint(true); // Mark as shown
      }, 4000);

      return () => {
        clearTimeout(fadeOutTimeout);
        clearTimeout(removeTimeout);
      };
    }
  }, [isOpen, hasShownScrollHint]);

  // Making color conversions to change color properties that were attached to alt1 values as a string from homePage 
  // Helper to convert hex to RGBA for styling
  const hexToRgba = (hex, alpha = 0.1) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Helper function to adjust brightness of a hex color
  const adjustBrightness = (hex, multiplier) => {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Apply brightness multiplier
    r = Math.min(255, Math.max(0, Math.floor(r * multiplier)));
    g = Math.min(255, Math.max(0, Math.floor(g * multiplier)));
    b = Math.min(255, Math.max(0, Math.floor(b * multiplier)));

    // Convert back to hex and return
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  // Finally, here are the modified colors of the activeColor passed from Homepage & observed by setupAltObserver.js 
  // Apply brightness adjustment
  const darkenedColor = adjustBrightness(activeColor, 0.55); // Navigation menu background color treatment
  const edgeColor = adjustBrightness(activeColor, 0.8); // Used as subtle border-color left and progress bar full-length indicator

  // Rendering the component
  return (
    <nav
      className={`navigation ${isScrollingUp ? 'visible' : 'hidden'}`}>
      <div
        className={`top-bar-items ${isOpen ? 'menu-open' : ''}`}
        style={{
          background: isOpen
            ? 'transparent' // Transparent background when menu is open
            : isScrolled
            ? hexToRgba(activeColor, 0.8) // Background when scrolled
            : 'transparent', // Default background
          backdropFilter: isScrolled && !isOpen ? 'blur(5px)' : 'none',
        }}
      >
        <div className="site-title">
          <h-title className="title">
            <Link to="/" className="homepage-link">DMI</Link>
          </h-title>
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`hamburger ${isOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      <div className={`menu-item ${isOpen ? 'open' : ''}`}>
        <div className="menu-item-1" onClick={handleCloseMenu}></div>
        <div
          className="menu-item-2"
          style={{'--darkenedColor': darkenedColor, '--darkerColor': edgeColor,}}>
          {/* Display gallery images directly */}
          <div className="menu-nav">
          <div className="nav-item">
          <Link to="https://dynamicmediainstitute.org/dmi-experience/" className="nav-link">
                <div className="name"><h4>What is DMI?</h4></div>
                {customArrowIcon2 && (
                  <div
                    className="arrow1"
                    dangerouslySetInnerHTML={{ __html: customArrowIcon2 }}
                  />
                )}
              </Link>
              </div>
            <div className="nav-item">
              <Link to="https://dynamicmediainstitute.org/student-work/case-studies/" className="nav-link">
                <h4>Case Studies</h4>
                {customArrowIcon2 && (
                  <div
                    className="arrow1"
                    dangerouslySetInnerHTML={{ __html: customArrowIcon2 }}
                  />
                )}
              </Link>
              </div>
          </div> 
          <div className="gallery-wrapper">
            <div className="scroll-indicator"></div>
            <div className="gallery-container">
                {showScrollHint && (
                  <div className="scroll-hint">
                    <h5>Scroll to explore</h5>
                    <span
                      className="arrow2"
                      dangerouslySetInnerHTML={{ __html: customArrowIcon }}
                    ></span>
                  </div>
                )}
              <div className="image-container-g">{galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.alt}
                  className={`gallery-image image-${index}`}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
