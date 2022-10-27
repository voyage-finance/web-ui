import { useQuery } from '@tanstack/react-query';

export const useCollectionMetadata = (collection: string) => {
  return useQuery(['collection-metadata', collection], async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/v1/metadata/collection/${collection}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error('Failed to fetch metadata: ', data);
    }
    return data;
  });
};
