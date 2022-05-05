import { Button, Card, Divider, Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import Image from 'next/image';
import React, { useState } from 'react';
import { PoolData, TrancheTextMap, TrancheType } from 'types';
import DepositTrancheModal from '../DepositTrancheModal';

type IProps = {
  type: TrancheType;
  poolData?: PoolData;
  withdrawable: number;
};

const TrancheCard: React.FC<IProps> = ({ type, poolData, withdrawable }) => {
  const [depositModalOpen, setDepositModalOpened] = useState(false);
  const currentDeposit =
    type === TrancheType.Senior
      ? poolData?.seniorLiquidity
      : poolData?.juniorLiquidity;
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
            {currentDeposit?.toString()}{' '}
            <Text component="span" inherit type="accent">
              TUS
            </Text>
          </Title>
          <Text size="sm">$ XXX</Text>
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
            {currentDeposit?.toString()}{' '}
            <Text weight={400} component="span">
              TUS
            </Text>
          </Title>
          <Text type="secondary">$-</Text>
        </Group>
      </Group>
      <Group position="apart">
        <Text type="secondary">Your Withdrawable</Text>
        <Group direction="column" spacing={0} align="end" mt={16}>
          <Title order={5}>
            {withdrawable}{' '}
            <Text weight={400} component="span">
              TUS
            </Text>
          </Title>
          <Text type="secondary">$-</Text>
        </Group>
      </Group>
      <Group grow mt={16}>
        <Button onClick={() => setDepositModalOpened(true)}>Deposit</Button>
        <Button kind="secondary" disabled={withdrawable === 0}>
          Withdraw
        </Button>
      </Group>
      {
        <DepositTrancheModal
          type={type}
          opened={depositModalOpen}
          onClose={() => setDepositModalOpened(false)}
          poolData={poolData}
        />
      }
    </Card>
  );
};

export default TrancheCard;
