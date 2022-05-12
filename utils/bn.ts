import BigNumber from 'bignumber.js';
import { BigNumber as EthersBN } from 'ethers';

export const shiftDecimals = (bn: BigNumber, decimals: number) => {
  BigNumber.config({ DECIMAL_PLACES: decimals });
  return new BigNumber(bn.toString()).dividedBy(
    new BigNumber(10).pow(decimals)
  );
};

export const formatEthersBN = (
  bn: EthersBN | BigNumber,
  decimals: number = 0
) => {
  const n = EthersBN.isBigNumber(bn) ? new BigNumber(bn.toString()) : bn;
  return n.shiftedBy(decimals * -1);
};

export const formatDecimals = (bn: BigNumber, decimals: number) => {
  return shiftDecimals(bn, decimals).toString();
};

export const toHexString = (bn: BigNumber) => {
  return `0x${bn.toString(16)}`;
};

export const fromBigNumber = (bn: any) => new BigNumber(bn.toString());

export const addDecimals = (num: any, decimals: number) => {
  BigNumber.config({ DECIMAL_PLACES: decimals, EXPONENTIAL_AT: 1e9 });
  return new BigNumber(num).multipliedBy(new BigNumber(10).pow(decimals));
};

// RAY = 10**27 units [0-1], multiply by 100 for % representation
export const rayToPercent = (num: any) => {
  return new BigNumber(num.toString()).dividedBy(Ray).multipliedBy(100);
};

export const Ray = new BigNumber(10).pow(27);

export const Zero = new BigNumber(0);
