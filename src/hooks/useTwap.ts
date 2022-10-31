import { useQuery } from '@tanstack/react-query';

export const useTwap = (collection: string) => {
  return useQuery(['collection-twap', collection], async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/v2/twap/${collection}`
    );
    const data = await res.json();
    if (!res.ok) {
      // TODO: we should throw but this is a stop gap for ultra new collections like gobblers, that do not have a TWAP yet
      console.warn(`Failed to fetch twap for ${collection}: returning 0`);
      return { twap: { price: '0' } };
    }
    return data;
  });
};
