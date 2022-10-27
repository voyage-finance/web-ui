import c from '@utils/config';
import { getBuiltGraphSDK } from '@graph';

export const subgraph = getBuiltGraphSDK({
  subgraph: process.env.NEXT_PUBLIC_SUBGRAPH,
});

export const getReserveId = (collection: string) =>
  `${collection}_${c.voyageAddress}`;
