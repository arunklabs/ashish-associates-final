import { createClient } from '@sanity/client';
import { log } from 'console';


// Sanity client configuration for the React project
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, // Use CDN for faster response in production
  apiVersion: '2021-06-07', // Use current date (YYYY-MM-DD) to target the latest API version
});

export { client };

// Error handling wrapper for Sanity queries
export const sanityFetch = async <T>(query: string, params: Record<string, any> = {}): Promise<T> => {
  try {
    const result = await client.fetch<T>(query, params);
    console.log("Sanity Result", result);
    return result;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw new Error(`Failed to fetch data from Sanity: ${error}`);
  }
};