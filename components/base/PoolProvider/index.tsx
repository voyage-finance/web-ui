import { useGetPool, useGetUserPoolData } from 'hooks';
import * as React from 'react';
import { PoolData, UserPoolData } from 'types';
import { useIsMounted } from '../../../utils/hooks';

interface PoolPageContextInterface {
  poolData?: PoolData;
  isPoolDataLoading: boolean;
  userData?: UserPoolData;
  isUserDataLoading: boolean;
  symbol: string;
}

export const PoolPageCtx = React.createContext<PoolPageContextInterface>({
  poolData: undefined,
  userData: undefined,
  isPoolDataLoading: false,
  isUserDataLoading: false,
  symbol: '',
});

const Provider: React.FC<{ symbol: string }> = ({ symbol, children }) => {
  const { data: poolData, loading: isPoolDataLoading } = useGetPool(symbol);
  const { data: userData, isLoading: isUserDataLoading } =
    useGetUserPoolData(symbol);
  return (
    <PoolPageCtx.Provider
      value={{
        poolData,
        userData,
        isPoolDataLoading,
        isUserDataLoading,
        symbol,
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
