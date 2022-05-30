import * as React from 'react';
import { PoolPageCtx } from '@components/base/PoolProvider';

export const usePoolDataCtx = () => {
  const { poolData, isPoolDataLoading } = React.useContext(PoolPageCtx);
  return [poolData, isPoolDataLoading] as const;
};

export const useUserDataCtx = () => {
  const { userData, isUserDataLoading } = React.useContext(PoolPageCtx);
  return [userData, isUserDataLoading] as const;
};

export const useSymbolCtx = () => {
  const { symbol } = React.useContext(PoolPageCtx);
  return [symbol] as const;
};
