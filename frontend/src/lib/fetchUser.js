/* Sort by function and image fetch for the UI-cards */
import sanityClient from './sanityClient'; 
import imageUrlBuilder from '@sanity/image-url'; 

const builder = imageUrlBuilder(sanityClient);

// Define a function to build image URLs
const imageUrlFor = (source) => builder.image(source).url();

export const fetchImages = async (sortOption = 'default') => {
  let orderClause = '';

  // Set sorting options except for random
  switch (sortOption) {
    case 'titleAsc':
      orderClause = '| order(title asc)';
      break;
    case 'titleDesc':
      orderClause = '| order(title desc)';
      break;
    case 'dateAsc':
      orderClause = '| order(_createdAt asc)';
      break;
    case 'dateDesc':
      orderClause = '| order(_createdAt desc)';
      break;
    default:
      orderClause = ''; // No specific sorting for randomization
  }

  const query = `*[_type == "imageAsset"] ${orderClause} {
    _id,
    title,
    description,
    "image1Url": image1.asset->url,
    "image2Url": image2.asset->url,
    caption1,
    alt1,
    alt2,
    url1,
    iconName
  }`;

  try {
    const data = await sanityClient.fetch(query);

    // Add URL processing
    const imagesWithUrls = data.map(image => ({
      ...image,
      image1: imageUrlFor(image.image1Url),
      image2: imageUrlFor(image.image2Url),
    }));

    return imagesWithUrls; // Return data without any additional sorting
  } catch (error) {
    console.error('Error fetching images', error);
    return [];
  }
};

export default fetchImages;
