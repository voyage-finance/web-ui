import { ReadContractArgs } from '@wagmi/core';
import { useContractRead as useContractReadWagmi } from 'wagmi';

export const useContractRead = <TConfig>(
  contractConfig: ReadContractArgs,
  functionName: string,
  args?: TConfig
) => {
  return useContractReadWagmi(contractConfig, functionName, {
    ...args,
    onError(error) {
      console.log(`useContractRead Error [${functionName}]`, error);
    },
  });
};
