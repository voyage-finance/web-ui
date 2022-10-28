import { useQuery } from '@tanstack/react-query';

export const useTwap = (collection: string) => {
  return useQuery(['collection-twap', collection], async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/v2/twap/${collection}`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error('Failed to fetch twap: ', data);
    }
    return data;
  });
};
