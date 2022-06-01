import { Group } from '@mantine/core';
import React, { useState } from 'react';
import { TrancheType } from 'types';
import { useAllowanceApproved } from 'hooks';
import DepositTrancheModal from '../DepositTrancheModal';
import TrancheCard from '../TrancheCard';
import TrancheTab from '@components/moleculas/TrancheTab';
import { useSymbolCtx } from 'hooks/context/usePoolDataCtx';

const TrancheDeposits: React.FC = () => {
  const [symbol] = useSymbolCtx();
  const [trancheType, setTrancheType] = useState(TrancheType.Senior);
  const [isApproved, isApproving, onApprove] = useAllowanceApproved(symbol);
  const [depositModalOpen, setDepositModalOpened] = useState(false);

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
        isApproved={isApproved}
        isApproving={isApproving}
        onApproveClick={onApprove}
      />

      <DepositTrancheModal
        type={trancheType}
        opened={depositModalOpen}
        onClose={() => setDepositModalOpened(false)}
      />
    </Group>
  );
};

export default TrancheDeposits;
