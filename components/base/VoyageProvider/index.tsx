import * as React from 'react';
import { VoyagePoolTokenMap } from '../../../types';
import { useIsMounted } from '../../../utils/hooks';

interface AppContextInterface {
  tokens: VoyagePoolTokenMap;
}

const DEFAULT_TOKENS: VoyagePoolTokenMap = {};

export const VoyageCtx = React.createContext<AppContextInterface>({
  tokens: DEFAULT_TOKENS,
});

const Provider: React.FC = ({ children }) => {
  const tokens = {};
  return <VoyageCtx.Provider value={{ tokens }}>{children}</VoyageCtx.Provider>;
};

export const VoyageProvider: React.FC = ({ children }) => {
  const isMounted = useIsMounted();
  return isMounted ? <Provider>{children}</Provider> : <>{children}</>;
};
