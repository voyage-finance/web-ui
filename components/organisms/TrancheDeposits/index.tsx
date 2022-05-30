import { Group } from '@mantine/core';
import React, { useState } from 'react';
import { TrancheType } from 'types';
import { useAllowanceApproved } from 'hooks';
import DepositTrancheModal from '../DepositTrancheModal';
import TrancheCard from '../TrancheCard';
import TrancheTab from '@components/moleculas/TrancheTab';
import {
  usePoolDataCtx,
  useSymbolCtx,
  useUserDataCtx,
} from 'hooks/context/usePoolDataCtx';

const TrancheDeposits: React.FC = () => {
  const [poolData] = usePoolDataCtx();
  const [symbol] = useSymbolCtx();
  const [userPoolData] = useUserDataCtx();
  const [trancheType, setTrancheType] = useState(TrancheType.Senior);
  const [isApproved, isApproving, onApprove] = useAllowanceApproved(symbol);
  const [depositModalOpen, setDepositModalOpened] = useState(false);

  return (
    <Group direction="column" spacing={0} align="stretch" mt={13}>
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
        poolData={poolData}
        withdrawable={
          trancheType === TrancheType.Junior
            ? userPoolData?.withdrawableJuniorTrancheBalance
            : userPoolData?.withdrawableSeniorTrancheBalance
        }
        balance={
          trancheType === TrancheType.Junior
            ? userPoolData?.juniorTrancheBalance
            : userPoolData?.seniorTrancheBalance
        }
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
