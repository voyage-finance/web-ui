import { VoyageContracts } from '../consts/addresses';
import { useGetDeployment } from './useGetDeployment';

export const useGetContractAddress = (contract: VoyageContracts) => {
  const { address } = useGetDeployment(contract);
  return address;
};
