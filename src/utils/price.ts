import BigNumber from 'bignumber.js';
import { normalizeBN } from './bn';

export const usdValue = (amount: BigNumber, priceInUSD: number, dp = 4) => {
  if (amount.isZero()) {
    return 'US$0';
  }

  const bnPrice = new BigNumber(priceInUSD);
  const usdValue = normalizeBN(amount.multipliedBy(bnPrice), 18).toFixed(
    dp,
    BigNumber.ROUND_HALF_DOWN
  );
  return `US$${usdValue}`;
};
