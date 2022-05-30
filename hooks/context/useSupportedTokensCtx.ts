import * as React from 'react';
import { VoyageCtx } from '@components/base/VoyageProvider';

export const useSupportedTokensCtx = () => {
  const { tokens } = React.useContext(VoyageCtx);
  return [tokens] as const;
};
