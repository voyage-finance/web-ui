import { Group } from '@mantine/core';
import React, { useState } from 'react';
import { TrancheType } from 'types';
import { useAllowanceApproved } from 'hooks';
import DepositTrancheModal from '../DepositTrancheModal';
import TrancheCard from '../TrancheCard';
import TrancheTab from '@components/moleculas/TrancheTab';
// import { useSymbolCtx } from 'hooks/context/usePoolDataCtx';
import WithdrawalModal from '../WithdrawalModal';
import { useGetContractAddress } from 'hooks/useGetContractAddress';
import { VoyageContracts } from 'consts/addresses';

const TrancheDeposits: React.FC = () => {
  // const [symbol] = useSymbolCtx();
  const [trancheType, setTrancheType] = useState(TrancheType.Senior);
  const voyageAddress = useGetContractAddress(VoyageContracts.Voyage);
  const [isApproved, isApproving, , onApprove] = useAllowanceApproved(
    voyageAddress,
    'You can now start depositing'
  );
  const [depositModalOpen, setDepositModalOpened] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpened] = useState(false);

  return (
    <Group direction="column" spacing={0} align="stretch">
      <Group spacing={0}>
        <TrancheTab
          trancheType={TrancheType.Senior}
          isActive={trancheType === TrancheType.Senior}
          onClick={() => setTrancheType(TrancheType.Senior)}
        />
        <TrancheTab
          trancheType={TrancheType.Junior}
          isActive={trancheType === TrancheType.Junior}
          onClick={() => setTrancheType(TrancheType.Junior)}
        />
      </Group>
      <TrancheCard
        type={trancheType}
        onDepositClick={() => {
          setDepositModalOpened(true);
        }}
        onWithdrawClick={() => {
          setWithdrawModalOpened(true);
        }}
        isApproved={isApproved}
        isApproving={isApproving}
        onApproveClick={onApprove}
      />
      <DepositTrancheModal
        type={trancheType}
        opened={depositModalOpen}
        onClose={() => setDepositModalOpened(false)}
      />
      <WithdrawalModal
        type={trancheType}
        opened={withdrawModalOpen}
        onClose={() => setWithdrawModalOpened(false)}
      />
    </Group>
  );
};

export default TrancheDeposits;
