/* Fetch SVG icons */
import sanityClient from './sanityClient';

export default async function fetchSVGIcons() {
  const query = '*[_type == "svgIcon"]{title, icon}';
  const icons = await sanityClient.fetch(query);
  console.log("Fetched SVG icons:", icons);
  return icons;
}

