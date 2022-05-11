import { Button, Card, Divider, Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import Image from 'next/image';
import React, { useState } from 'react';
import { PoolData, TrancheTextMap, TrancheType } from 'types';
import DepositTrancheModal from '../DepositTrancheModal';
import { useAssetPrice } from '../../../hooks/useAssetPrice';
import { ReserveAssets } from '../../../consts';
import { Zero } from '../../../utils/bn';
import { usdValue } from '../../../utils/price';
import BigNumber from 'bignumber.js';

type IProps = {
  type: TrancheType;
  poolData?: PoolData;
  withdrawable?: BigNumber;
  balance?: BigNumber;
  onDeposited: () => void;
  isApproved?: boolean;
  isApproving?: boolean;
  onApprove: () => void;
  symbol: string;
};

const getLiqiuidityByTranche = (
  poolData: PoolData | undefined,
  tranche: TrancheType
) => {
  if (!poolData) {
    return Zero;
  }

  return tranche === TrancheType.Senior
    ? poolData.seniorLiquidity
    : poolData.juniorLiquidity;
};

const TrancheCard: React.FC<IProps> = ({
  type,
  poolData,
  withdrawable,
  balance,
  onDeposited,
  isApproved,
  isApproving,
  onApprove,
  symbol,
}) => {
  const [depositModalOpen, setDepositModalOpened] = useState(false);
  const [priceData] = useAssetPrice(ReserveAssets.TUS);
  // TODO: this should be the user's deposits, not pool deposits
  const liquidity = getLiqiuidityByTranche(poolData, type);
  const currentAPY =
    type === TrancheType.Senior
      ? poolData?.seniorLiquidityRate
      : poolData?.juniorLiquidityRate;

  return (
    <Card px={32} py={29}>
      <Text type="gradient" weight={700} mb={16}>
        {TrancheTextMap[type]} Tranche
      </Text>
      <Image
        src="/crabada-cover.png"
        alt="crabada"
        layout="responsive"
        width={425}
        height={108}
        objectFit="cover"
      />
      <Group position="apart" mt={16} align="start">
        <Group spacing={0} direction="column">
          <Text type="secondary">{TrancheTextMap[type]} Tranche Liquidity</Text>
          <Title order={4}>
            {liquidity.toFixed()}{' '}
            <Text component="span" inherit type="accent">
              {symbol}
            </Text>
          </Title>
          <Text size="sm">{`~${usdValue(
            liquidity,
            priceData.latestPrice
          )}`}</Text>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">{TrancheTextMap[type]} APY</Text>
          <Title order={4}>{currentAPY?.toString()}%</Title>
        </Group>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart">
        <Text type="secondary">Your Total Deposit</Text>
        <Group direction="column" spacing={0} align="end">
          <Title order={5}>
            {balance?.toFixed()}{' '}
            <Text weight={400} component="span">
              {symbol}
            </Text>
          </Title>
          <Text type="secondary">{`~${usdValue(
            liquidity,
            priceData.latestPrice
          )}`}</Text>
        </Group>
      </Group>
      <Group position="apart">
        <Text type="secondary">Your Withdrawable</Text>
        <Group direction="column" spacing={0} align="end" mt={16}>
          <Title order={5}>
            {withdrawable?.toFixed()}{' '}
            <Text weight={400} component="span">
              {symbol}
            </Text>
          </Title>
          <Text type="secondary">{`~${usdValue(
            withdrawable || Zero,
            priceData.latestPrice
          )}`}</Text>
        </Group>
      </Group>
      {isApproved ? (
        <Group grow mt={16}>
          <Button onClick={() => setDepositModalOpened(true)}>Deposit</Button>
          <Button kind="secondary" disabled={withdrawable?.isZero()}>
            Withdraw
          </Button>
        </Group>
      ) : (
        <Button onClick={onApprove} loading={isApproving} mt={16} fullWidth>
          Approve
        </Button>
      )}
      <DepositTrancheModal
        type={type}
        opened={depositModalOpen}
        onClose={() => setDepositModalOpened(false)}
        poolData={poolData}
        onDeposited={onDeposited}
        symbol={symbol}
        balance={balance}
      />
    </Card>
  );
};

export default TrancheCard;
