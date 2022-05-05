import BigNumber from 'bignumber.js';
// import numeral from 'numeral';

// export const formatBn = (bn: BN, fractionsInlcuded?: boolean) =>
//       numeral(bn.toNumber()).format(fractionsInlcuded ? '0,0.0' : '0,0');

export const formatDecimals = (bn: BigNumber, decimals: number) => {
  BigNumber.config({ DECIMAL_PLACES: decimals });
  return new BigNumber(bn.toString())
    .dividedBy(new BigNumber(10).pow(decimals))
    .toString();
};

export const fromBigNumber = (bn: any) => new BigNumber(bn.toString());

export const addDecimals = (num: any, decimals: number) => {
  BigNumber.config({ DECIMAL_PLACES: decimals });
  return new BigNumber(num)
    .multipliedBy(new BigNumber(10).pow(decimals))
    .toString();
};
