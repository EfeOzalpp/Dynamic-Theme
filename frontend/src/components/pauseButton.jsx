/* Pause Animation Option - Accessibility */
import React, { useRef, useState, useEffect } from 'react';
import Lottie from 'lottie-react'; // Import Lottie React
import animationData from '../lottie/pauseButton.json'; // Import your JSON animation
import '../styles/sortByStyles.css'; // Add CSS for styling if necessary

const PauseButton = ({ toggleP5Animation }) => {
  const lottieRef = useRef(); // Ref for Lottie animation
  const [isClicked, setIsClicked] = useState(false); // Track click state
  const [currentFrame, setCurrentFrame] = useState(3); // Start at frame 3

  // Sync initial state with the fireworks rendering logic
  useEffect(() => {
    if (toggleP5Animation) {
      toggleP5Animation(!isClicked); // Initial sync
    }
  }, [toggleP5Animation, isClicked]);

  const handleMouseEnter = () => {
    if (lottieRef.current && !isClicked) {
      // Play the animation from frame 3 to frame 10 on hover
      lottieRef.current.playSegments([3, 10], true);
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current && !isClicked) {
      // Pause the animation and leave it at the last hovered frame
      lottieRef.current.goToAndStop(currentFrame, true);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent the event from reaching parent components
  
    if (lottieRef.current) {
      let targetFrame = isClicked ? 3 : 20; // Toggle between frames
      lottieRef.current.playSegments([currentFrame, targetFrame], true);
      setCurrentFrame(targetFrame);
      setIsClicked(!isClicked);
  
      // Notify the parent about the toggle
      if (toggleP5Animation) {
        toggleP5Animation(!isClicked);
      }
    }
  };
  
  return (
    <div
      className="lottie-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick} // Trigger click behavior
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false} // Disable looping
        autoplay={false} // Start paused
      />
    </div>
  );
};

export default PauseButton;
