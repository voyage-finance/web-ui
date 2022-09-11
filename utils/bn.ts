import BigNumber from 'bignumber.js';
import { BigNumber as EthersBN } from 'ethers';
import { MAX_UINT_AMOUNT } from '../consts';

export const BigNumberZeroDecimal = BigNumber.clone({
  DECIMAL_PLACES: 0,
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
});

export const shiftDecimals = (bn: BigNumber | string, decimals: number) => {
  BigNumber.config({ DECIMAL_PLACES: decimals });
  return new BigNumber(bn.toString()).dividedBy(
    new BigNumber(10).pow(decimals)
  );
};

export function valueToBigNumber(amount: BigNumberValue): BigNumber {
  if (amount instanceof BigNumber) {
    return amount;
  }

  return new BigNumber(amount);
}

export function valueToZDBigNumber(amount: BigNumberValue): BigNumber {
  return new BigNumberZeroDecimal(amount);
}

export function normalize(n: BigNumberValue, decimals: number): string {
  return normalizeBN(n, decimals).toString(10);
}

export function normalizeBN(n: BigNumberValue, decimals: number): BigNumber {
  return valueToBigNumber(n).shiftedBy(decimals * -1);
}

export type BigNumberValue = string | number | BigNumber;

export const WAD = valueToZDBigNumber(10).pow(18);
export const HALF_WAD = WAD.dividedBy(2);

export const RAY = valueToZDBigNumber(10).pow(27);
export const HALF_RAY = RAY.dividedBy(2);

export const WAD_RAY_RATIO = valueToZDBigNumber(10).pow(9);

export function rayMul(a: BigNumberValue, b: BigNumberValue): BigNumber {
  return HALF_RAY.plus(valueToZDBigNumber(a).multipliedBy(b)).div(RAY);
}

export function rayDiv(a: BigNumberValue, b: BigNumberValue): BigNumber {
  const halfB = valueToZDBigNumber(b).div(2);

  return halfB.plus(valueToZDBigNumber(a).multipliedBy(RAY)).div(b);
}

export function wadMul(a: BigNumberValue, b: BigNumberValue): BigNumber {
  return HALF_WAD.plus(valueToZDBigNumber(a).multipliedBy(b)).div(WAD);
}

export function wadDiv(a: BigNumberValue, b: BigNumberValue): BigNumber {
  const halfB = valueToZDBigNumber(b).div(2);
  return halfB.plus(valueToZDBigNumber(a).multipliedBy(WAD)).div(b);
}

export function rayToWad(a: BigNumberValue): BigNumber {
  const halfRatio = valueToZDBigNumber(WAD_RAY_RATIO).div(2);

  return halfRatio.plus(a).div(WAD_RAY_RATIO);
}

export function wadToRay(a: BigNumberValue): BigNumber {
  return valueToZDBigNumber(a).multipliedBy(WAD_RAY_RATIO).decimalPlaces(0);
}

export const formatEthersBN = (bn: EthersBN | BigNumber, decimals = 0) => {
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
  return new BigNumber(num).shiftedBy(decimals);
};

// RAY = 10**27 units [0-1], multiply by 10000 for % representation
export const rayToPercent = (num: BigNumberValue) => {
  return normalizeBN(num, 27).multipliedBy(100);
};

export const formatAmount = (value?: BigNumber) => {
  return (value ? value : Zero).toFixed(3, BigNumber.ROUND_UP);
};

export const formatPercent = (value?: BigNumber) => {
  return `${(value ? value : Zero).toFixed(3, BigNumber.ROUND_UP)} %`;
};

export const Ray = new BigNumber(10).pow(27);

export const Zero = new BigNumber(0);

export const MaxUint256 = new BigNumber(MAX_UINT_AMOUNT);
