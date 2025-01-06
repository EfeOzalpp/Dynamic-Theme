// Updated TitleDivider component
import React from 'react';
import '../styles/title.css'; // Ensure the path is correct

const TitleDivider = ({ svgIcon, movingTextColors, pauseAnimation }) => {
  // Destructure colors or use defaults if not available
  const [color1, color2, color3] = movingTextColors || ['#70c6b0', '#5670b5', '#50b0c5'];

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

  // Apply brightness adjustment
  const brightenedColor1 = adjustBrightness(color1, 1.05);
  const brightenedColor2 = adjustBrightness(color2, 1.25);
  const brightenedColor3 = adjustBrightness(color3, 1.1);

  const createContent = () => (
    <>
      {/* First instance (3n+1) */}
      <span className="moving-text" style={{ color: brightenedColor1 }}>
        Institute
        <span className="logo-container">
          <span
            id="Layer_12"
            dangerouslySetInnerHTML={{ __html: svgIcon }}
            style={{ fill: brightenedColor1 }} // Apply color to SVG path dynamically
          ></span>
        </span>
      </span>

      {/* Second instance (3n+2) */}
      <span className="moving-text" style={{ color: brightenedColor2 }}>
        Dyna
        <span className="logo-container">
          <span
            id="Layer_12"
            dangerouslySetInnerHTML={{ __html: svgIcon }}
            style={{ fill: brightenedColor2 }} // Apply color to SVG path dynamically
          ></span>
        </span>
        mic Media
      </span>

      {/* Third instance (3n+3) */}
      <span className="moving-text" style={{ color: brightenedColor3 }}>
        Dyn
        <span className="logo-container">
          <span
            id="Layer_12"
            dangerouslySetInnerHTML={{ __html: svgIcon }}
            style={{ fill: brightenedColor3 }} // Apply color to SVG path dynamically
          ></span>
        </span>
        mic Media
      </span>
    </>
  );

  return (
    <div className="title-container">
      <div className="static-title">
        <h1>MassArt 2025</h1>
      </div>
      {/* Add the pauseAnimation class dynamically */}
      <div className={`moving-title ${pauseAnimation ? 'paused' : ''}`}>
        <h1 className="title-with-icon moving-text-wrapper">
          {createContent()}
          {createContent()}
        </h1>
      </div>
    </div>
  );
};

export default TitleDivider;
