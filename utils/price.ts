import BigNumber from 'bignumber.js';

export const usdValue = (amount: BigNumber, priceInUSD: number, dp = 2) => {
  if (amount.isZero()) {
    return 'US$0';
  }

  const bnPrice = new BigNumber(priceInUSD);
  const usdValue = amount
    .multipliedBy(bnPrice)
    .toFixed(dp, BigNumber.ROUND_HALF_DOWN);
  return `US$${usdValue}`;
};
