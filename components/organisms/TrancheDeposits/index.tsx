import { Card, Text } from '@components/base';
import { Box, Group } from '@mantine/core';
import React, { useState } from 'react';
import { PoolData, TrancheType } from 'types';
import { useAllowanceApproved, useGetUserPoolData } from 'hooks';
import DepositTrancheModal from '../DepositTrancheModal';
import TrancheCard from '../TrancheCard';
import TrancheTab from '@components/moleculas/TrancheTab';
type IProps = {
  poolData?: PoolData;
  onDeposited: () => void;
  symbol: string;
};

const TrancheDeposits: React.FC<IProps> = ({
  poolData,
  onDeposited: _onDeposited,
  symbol,
}) => {
  const [trancheType, setTrancheType] = useState(TrancheType.Senior);
  const [isApproved, isApproving, onApprove] = useAllowanceApproved(symbol);
  const [depositModalOpen, setDepositModalOpened] = useState(false);
  const { data: userPoolData, refetch: refetchUserPoolData } =
    useGetUserPoolData(symbol);

  const onDeposited = () => {
    // TODO refetchPoolData();
    refetchUserPoolData();
    _onDeposited();
  };

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
        symbol={symbol}
      />

      <DepositTrancheModal
        type={trancheType}
        opened={depositModalOpen}
        onClose={() => setDepositModalOpened(false)}
        poolData={poolData}
        onDeposited={onDeposited}
        symbol={symbol}
        balance={
          trancheType === TrancheType.Junior
            ? userPoolData?.juniorTrancheBalance
            : userPoolData?.seniorTrancheBalance
        }
      />
    </Group>
  );
};

export default TrancheDeposits;
