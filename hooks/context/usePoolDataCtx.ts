import * as React from 'react';
import { PoolPageCtx } from '@components/base/PoolProvider';

export const usePoolDataCtx = () => {
  const { poolData, isPoolDataLoading, refetchPool } =
    React.useContext(PoolPageCtx);
  return [poolData, isPoolDataLoading, refetchPool] as const;
};

export const useUserDataCtx = () => {
  const { userData, isUserDataLoading, refetchUser } =
    React.useContext(PoolPageCtx);
  return [userData, isUserDataLoading, refetchUser] as const;
};

export const useSymbolCtx = () => {
  const { symbol } = React.useContext(PoolPageCtx);
  return [symbol] as const;
};
