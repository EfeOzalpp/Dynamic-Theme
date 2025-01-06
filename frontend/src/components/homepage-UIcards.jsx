// User Card Component
import React from 'react';
import '../styles/UIcards.css'; 

function UIcards({ title, image1, image2, alt1, alt2, url1, className, customArrowIcon2 }) {
  return ( 
    <div className={`card-container ${className}`}>
      <div className={`image-container ${className}`}>
        <a href={url1} className={`ui-link ${className}`}>
          <img src={image1} alt={alt1} className={`ui-image1 ${className}`} />
        </a>
        <h-name className={`image-title ${className}`}>
          <a href={url1} className={`ui-link-2 ${className}`}>
          <span className="title-text">{title}</span>
            {customArrowIcon2 && <div className="svg-icon" dangerouslySetInnerHTML={{ __html: customArrowIcon2 }} />}
          </a>
        </h-name>
      </div>
      <div className={`image-container2 ${className}-2`}>
        <a href={url1} className={`ui-link-3 ${className}`}>
          <img src={image2} alt={alt2} className={`ui-image2 ${className}-2`} />
        </a>
      </div>
    </div>
  );
}

export default UIcards;
