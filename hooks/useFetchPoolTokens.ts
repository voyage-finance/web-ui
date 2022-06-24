import { useContractRead } from 'hooks';
import { VoyagePoolTokenMap } from '../types';
import { VoyageContracts } from '../consts/addresses';
import { useGetDeployment } from './useGetDeployment';

export const useFetchPoolTokens = () => {
  const { address, abi } = useGetDeployment(VoyageContracts.Voyager);
  const { data: tokens } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'getPoolTokens'
  );

  let tokensMap = Object.fromEntries(tokens || []) as VoyagePoolTokenMap;
  for (const key in tokensMap) {
    tokensMap[key] = tokensMap[key].toLowerCase();
  }
  return tokensMap;
};
