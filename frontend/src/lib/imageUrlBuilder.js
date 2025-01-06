// Building URL for image fetching
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from './sanityClient';

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}