// Alt observer to change UI color theme based on visible alt
let currentlyActiveAlt1 = null;
let highestVisibility = 0;
let debounceTimeout = null;

const setupAltObserver = (onActivate, onDeactivate) => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: Array.from(Array(101).keys(), (x) => x / 100), // React to small changes in visibility
  };

  const observerCallback = (entries) => {
    // Sort entries by visibility in descending order
    entries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    entries.forEach((entry) => {
      const element = entry.target;
      const imageElement = element.querySelector('.ui-image1');

      if (imageElement) {
        const alt1Value = imageElement.getAttribute('alt');
        const visibility = entry.intersectionRatio;

        console.log(`Retrieved alt1 value: '${alt1Value}', visibility: ${visibility}`);

        if (visibility > 0.1 && visibility > highestVisibility) {
          if (currentlyActiveAlt1 !== alt1Value) {
            if (currentlyActiveAlt1) {
              onDeactivate(currentlyActiveAlt1);
            }
            onActivate(alt1Value);
            currentlyActiveAlt1 = alt1Value;
            highestVisibility = visibility;
            console.log(`Activated: ${alt1Value}`);
          }
        } else if (visibility <= 0.1 && currentlyActiveAlt1 === alt1Value) {
          onDeactivate(alt1Value);
          currentlyActiveAlt1 = null;
          highestVisibility = 0;
          console.log(`Deactivated: ${alt1Value}`);
        }
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  const triggerInitialActivation = () => {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      const cards = Array.from(document.querySelectorAll('.card-container'));
      const entries = cards.map((card) => {
        const boundingRect = card.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const visibility = Math.max(
          0,
          Math.min(boundingRect.height, viewportHeight - boundingRect.top) / boundingRect.height
        );
        return {
          target: card,
          intersectionRatio: visibility,
        };
      });

      observerCallback(entries); // Trigger the evaluation with sorted entries
    }, 50); // Reduced debounce time for quicker color application (adjust as needed)
  };

  document.querySelectorAll('.card-container').forEach((card) => observer.observe(card));
  triggerInitialActivation();
};

export default setupAltObserver;
