import BN from 'bn.js';
import numeral from 'numeral';

export const formatBn = (bn: BN, fractionsInlcuded?: boolean) =>
      numeral(bn.toNumber()).format(fractionsInlcuded ? '0,0.0' : '0,0');