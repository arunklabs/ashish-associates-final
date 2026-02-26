import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2021-06-07',
});

export { client };

export const sanityFetch = async <T>(query: string, params: Record<string, unknown> = {}): Promise<T> => {
  try {
    const result = await client.fetch<T>(query, params);
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log('Sanity fetch OK', typeof result === 'object' && result !== null ? 'object' : typeof result);
    }
    return result;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Sanity fetch error:', error);
    }
    throw new Error(`Failed to fetch data from Sanity: ${error instanceof Error ? error.message : String(error)}`);
  }
};
