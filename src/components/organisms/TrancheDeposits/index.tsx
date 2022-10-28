import TrancheTab from '@components/moleculas/TrancheTab';
import { DEFAULT_RESERVE_STATE, useReserve } from '@hooks/useReserve';
import { Stack, Tabs } from '@mantine/core';
import { TrancheType } from '@types';
import c from '@utils/config';
import { useAllowanceApproved } from 'hooks';
import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import DepositModal from '../DepositTrancheModal';
import TrancheCard from '../TrancheCard';
import UnbondingModal from '../UnbondingModal';
import WithdrawalModal from '../WithdrawalModal';

interface Props {
  collection: string;
}

const TrancheDeposits: React.FC<Props> = ({ collection }) => {
  const [trancheType, setTrancheType] = useState(TrancheType.Senior);
  const { address } = useAccount();
  const { data: reserve = DEFAULT_RESERVE_STATE, isLoading } = useReserve(
    collection,
    address
  );
  const [isApproved, , isApproving, onApprove] = useAllowanceApproved(
    c.wethAddress,
    c.voyageAddress,
    'You can now start depositing'
  );
  const [depositModalOpen, setDepositModalOpened] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpened] = useState(false);
  const [unbondingModalOpen, setUnbondingModalOpened] = useState(false);
  const onDepositClick = () => setDepositModalOpened(true);
  const onWithdrawClick = () => setWithdrawModalOpened(true);
  const onClaimClick = () => setUnbondingModalOpened(true);
  const commonTabProps = {
    currency: reserve.currency,
    userUnbonding: reserve.userUnbondingData,
    totalUnbonding: reserve.totalUnbonding,
    totalMaxUnderlying: reserve.totalMaxUnderlying,
    onDepositClick,
    onWithdrawClick,
    onClaimClick,
    onApproveClick: onApprove,
    isApproved,
    isApproving,
    isLoading,
  };

  return (
    <Stack spacing={0} align="stretch">
      <Tabs
        onTabChange={(tab) =>
          setTrancheType(parseInt(tab as string, 10) as TrancheType)
        }
        value={trancheType.toString()}
        styles={{
          tabsList: {
            display: 'flex',
          },
          tab: {
            padding: 0,
            background: 'rgba(27, 29, 44, 0.5)',
            border: '1px solid #575B79',
            borderRadius: '10px',
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 0,
            flexGrow: 1,
            boxSizing: 'border-box',
            cursor: 'pointer',
            '&[data-active]': {
              background: '#272940',
              borderBottom: `1px solid #272940`,
            },
            '&:first-of-type': {
              borderRightWidth: '0.5px',
            },
            '&:last-of-type': {
              borderLeftWidth: '0.5px',
            },
          },
        }}
        unstyled
      >
        <Tabs.List>
          <Tabs.Tab value={TrancheType.Senior.toString()}>
            <TrancheTab
              trancheType={TrancheType.Senior}
              onClick={() => setTrancheType(TrancheType.Senior)}
            />
          </Tabs.Tab>
          <Tabs.Tab value={TrancheType.Junior.toString()}>
            <TrancheTab
              trancheType={TrancheType.Junior}
              onClick={() => setTrancheType(TrancheType.Junior)}
            />
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={TrancheType.Junior.toString()}>
          <TrancheCard
            tranche={TrancheType.Junior}
            liquidity={reserve.juniorTrancheLiquidity}
            apr={reserve.juniorTrancheDepositRate}
            vToken={reserve.juniorTrancheVToken}
            userDeposit={reserve.userDepositData.junior}
            {...commonTabProps}
          />
        </Tabs.Panel>

        <Tabs.Panel value={TrancheType.Senior.toString()}>
          <TrancheCard
            tranche={TrancheType.Senior}
            liquidity={reserve.seniorTrancheLiquidity}
            apr={reserve.seniorTrancheDepositRate}
            vToken={reserve.seniorTrancheVToken}
            userDeposit={reserve.userDepositData.senior}
            {...commonTabProps}
          />
        </Tabs.Panel>
      </Tabs>

      <DepositModal
        collection={collection}
        tranche={trancheType}
        opened={depositModalOpen}
        onClose={() => setDepositModalOpened(false)}
      />
      <WithdrawalModal
        collection={collection}
        tranche={trancheType}
        opened={withdrawModalOpen}
        onClose={() => setWithdrawModalOpened(false)}
      />
      <UnbondingModal
        collection={collection}
        opened={unbondingModalOpen}
        onClose={() => setUnbondingModalOpened(false)}
      />
    </Stack>
  );
};

export default TrancheDeposits;
