// Fetch gallery images for the navigation menu
import sanityClient from './sanityClient';

const fetchGallery = async () => {
  const query = `
    *[_type == "gallery"]{
      _id,
      images[] {
        image {
          asset-> {
            url
          }
        },
        altText
      }
    }
  `;

  try {
    const data = await sanityClient.fetch(query);

    // Flatten and randomize images
    const flattenedImages = data.flatMap((gallery) =>
      gallery.images.map((img, index) => ({
        url: img.image?.asset?.url || '',
        alt: img.altText || 'Default Alt Text',
        cssClass: `gallery-image-${index}`, // Generate unique class names here if needed
      }))
    );

    const shuffledImages = flattenedImages.sort(() => Math.random() - 0.5);

    console.log('Shuffled Gallery Data:', shuffledImages);
    return shuffledImages;
  } catch (error) {
    console.error('Error fetching gallery data:', error);
    return [];
  }
};

export default fetchGallery;
