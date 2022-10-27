import c from '@utils/config';

export const getExplorerLink = (txHash: string) => `${c.explorerUrl}/${txHash}`;
