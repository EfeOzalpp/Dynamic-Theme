// Sanity Client API
import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: '5fk33nme', 
  dataset: 'production', 
  apiVersion: '2024-04-23', 
  useCdn: true, 
});

export default sanityClient;
