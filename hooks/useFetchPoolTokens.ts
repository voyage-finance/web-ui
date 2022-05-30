import { useContractRead } from 'hooks';
import { VoyagePoolTokenMap } from '../types';
import { VoyageContracts } from '../consts/addresses';
import { useGetDeployment } from './useGetDeployment';

export const useFetchPoolTokens = () => {
  const { address, abi } = useGetDeployment(
    VoyageContracts.VoyageProtocolDataProvider
  );
  const { data: tokens } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'getPoolTokens'
  );

  return Object.fromEntries(tokens || []) as VoyagePoolTokenMap;
};
