import { useContractRead } from 'hooks';
import { useEffect } from 'react';
import { fromBigNumber } from 'utils/bn';

import { VoyageContracts } from '../consts/addresses';
import { useGetDeployment } from './useGetDeployment';

export const useGetBorrowParams = (assetAddress?: string) => {
  const { address, abi } = useGetDeployment(VoyageContracts.Voyager);
  const { data, refetch } = useContractRead(
    {
      addressOrName: address,
      contractInterface: abi,
    },
    'previewBorrowParams',
    {
      args: [assetAddress, '0'],
      enabled: false,
    }
  );

  useEffect(() => {
    if (assetAddress) {
      refetch();
    }
  }, [assetAddress]);

  return [
    data
      ? {
          term: fromBigNumber(data[3]),
          epoch: fromBigNumber(data[4]),
        }
      : undefined,
    refetch,
  ] as const;
};
