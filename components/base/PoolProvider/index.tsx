import { useGetPool, useGetUserPoolData } from 'hooks';
import * as React from 'react';
import { ReserveData, UserPoolData } from 'types';
import { useIsMounted } from '../../../utils/hooks';

interface PoolPageContextInterface {
  poolData?: ReserveData;
  isPoolDataLoading: boolean;
  userData?: UserPoolData;
  isUserDataLoading: boolean;
  symbol: string;
  refetchPool: () => void;
  refetchUser: () => void;
}

export const PoolPageCtx = React.createContext<PoolPageContextInterface>({
  poolData: undefined,
  userData: undefined,
  isPoolDataLoading: false,
  isUserDataLoading: false,
  symbol: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetchPool: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetchUser: () => {},
});

const Provider: React.FC<{ symbol: string }> = ({ symbol, children }) => {
  const {
    data: poolData,
    loading: isPoolDataLoading,
    refetch: refetchPool,
  } = useGetPool(symbol);
  const {
    data: userData,
    loading: isUserDataLoading,
    refetch: refetchUser,
  } = useGetUserPoolData(symbol);
  return (
    <PoolPageCtx.Provider
      value={{
        poolData,
        userData,
        isPoolDataLoading,
        isUserDataLoading,
        symbol,
        refetchPool,
        refetchUser,
      }}
    >
      {children}
    </PoolPageCtx.Provider>
  );
};

export const PoolProvider: React.FC<{ symbol: string }> = ({
  symbol,
  children,
}) => {
  const isMounted = useIsMounted();
  return isMounted ? (
    <Provider symbol={symbol}>{children}</Provider>
  ) : (
    <>{children}</>
  );
};
