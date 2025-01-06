// Intersection Observer to Transform UI-cards based on visibility
let observer = null; // Store the observer instance globally

const setupIntersectionObserver = (pauseAnimation) => {
  if (observer) {
    observer.disconnect(); // Disconnect the observer if it already exists
    observer = null; // Clear the reference
  }

  if (pauseAnimation) {
    return; // Skip setting up the observer when paused
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from(Array(101).keys(), (x) => x / 100),
  };

  const applyTransform = (percentage, imageContainer, imageContainer2) => {

    let imageContainerTransform, imageContainer2Transform;
    let imageContainerZIndex, imageContainer2ZIndex;

    // Conditions for screen width <= 768px
    if (window.innerWidth <= 768) {
      if (percentage > 0.55) {
        imageContainerTransform = 'translate(4.5vw)';
        imageContainer2Transform = 'translate(1vw, -108vw)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.35 && percentage <= 0.55) {
        imageContainerTransform = 'translate(4.5vw)';
        imageContainer2Transform = 'translate(1vw, -108vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage > 0.15 && percentage <= 0.35) {
        imageContainerTransform = 'translate(2vw, 2vw)';
        imageContainer2Transform = 'translate(4vw, -115vw)';
        imageContainerZIndex = '6';
        imageContainer2ZIndex = '3';
      } else {
        imageContainerTransform = 'translateY(-2.4vw)';
        imageContainer2Transform = 'translate(7.5vw, -111.5vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    }
    // Conditions for screen width between 768px and 1024px
    else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
      if (percentage > 0.55) {
        imageContainerTransform = 'translate(4vw, -3vw)';
        imageContainer2Transform = 'translate(1vw, -63vw)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.35 && percentage <= 0.55) {
        imageContainerTransform = 'translate(4vw, -3vw)';
        imageContainer2Transform = 'translate(1vw, -63vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage > 0.15 && percentage <= 0.35) {
        imageContainerTransform = 'translate(2vw, -1.8vw)';
        imageContainer2Transform = 'translate(2.8vw, -65vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else {
        imageContainerTransform = 'translate(0vw, -5vw)';
        imageContainer2Transform = 'translate(2.8vw, -65vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    }
    // Conditions for screen width above 1024px
    else if (window.innerWidth > 1024) {
      if (percentage > 0.55) {
        imageContainerTransform = 'translate(1.75vw, 0vw)';
        imageContainer2Transform = 'translate(0vw, -31vw)';
        imageContainerZIndex = '1';
        imageContainer2ZIndex = '5';
      } else if (percentage > 0.35 && percentage <= 0.55) {
        imageContainerTransform = 'translate(1.75vw, 0vw)';
        imageContainer2Transform = 'translate(0vw, -31vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      } else if (percentage > 0.15 && percentage <= 0.35) {
        imageContainerTransform = 'translate(0.25vw, 1vw)';
        imageContainer2Transform = 'translate(-0vw, -30.5vw)';
        imageContainerZIndex = '6';
        imageContainer2ZIndex = '3';
      } else {
        imageContainerTransform = 'translateY(0vw)';
        imageContainer2Transform = 'translate(1vw, -31vw)';
        imageContainerZIndex = '5';
        imageContainer2ZIndex = '1';
      }
    }

    imageContainer.style.transform = imageContainerTransform;
    imageContainer.style.zIndex = imageContainerZIndex;
    imageContainer2.style.transform = imageContainer2Transform;
    imageContainer2.style.zIndex = imageContainer2ZIndex;
  };

  const calculateAndApplyTransform = (element) => {
    const boundingRect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    const elementTop = boundingRect.top;
    const elementHeight = boundingRect.height;

    const imageContainer = element.querySelector('.image-container');
    const imageContainer2 = element.querySelector('.image-container2');

    const percentageAboveCenter = Math.max(0, Math.min(elementHeight, viewportCenter - elementTop)) / elementHeight;

    applyTransform(percentageAboveCenter, imageContainer, imageContainer2);
  };

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      calculateAndApplyTransform(entry.target);
    });
  };

  observer = new IntersectionObserver(observerCallback, observerOptions);
  document.querySelectorAll('.card-container').forEach((card) => observer.observe(card));
};

export default setupIntersectionObserver;
