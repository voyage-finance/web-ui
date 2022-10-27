import BigNumber from 'bignumber.js';
import { wadDiv, wadMul, Zero } from './bn';

export const convertToAssets = (
  shares: BigNumber,
  totalShares: BigNumber,
  totalAssets: BigNumber
) => {
  return totalShares.isZero()
    ? Zero
    : wadDiv(wadMul(shares, totalAssets), totalShares);
};
