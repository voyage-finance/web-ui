import { Button, Card, Divider, Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import Image from 'next/image';
import React, { useState } from 'react';
import { TrancheType } from 'types';
import DepositTrancheModal from '../DepositTrancheModal';
import BigNumber from 'bignumber.js';

type IProps = {
  type: TrancheType;
  total: number;
  totalUSD: number;
  withdrawable: number;
  withdrawableUSD: number;
  decimals?: BigNumber;
};

const TrancheCard: React.FC<IProps> = ({
  total,
  totalUSD,
  withdrawable,
  withdrawableUSD,
  type,
  decimals,
}) => {
  const [depositModalOpen, setDepositModalOpened] = useState(false);
  return (
    <Card px={32} py={29}>
      <Text type="gradient" weight={700} mb={16}>
        {type} Tranche
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
          <Text type="secondary">{type} Tranche Liquidity</Text>
          <Title order={4}>
            100,000{' '}
            <Text component="span" inherit type="accent">
              TUS
            </Text>
          </Title>
          <Text size="sm">$100,000.00</Text>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">{type} APY</Text>
          <Title order={4}>217%</Title>
        </Group>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart">
        <Text type="secondary">Your Total Deposit</Text>
        <Group direction="column" spacing={0} align="end">
          <Title order={5}>
            {total}{' '}
            <Text weight={400} component="span">
              TUS
            </Text>
          </Title>
          <Text type="secondary">${totalUSD}</Text>
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
          <Text type="secondary">${withdrawableUSD}</Text>
        </Group>
      </Group>
      <Group grow mt={16}>
        <Button onClick={() => setDepositModalOpened(true)}>Deposit</Button>
        <Button kind="secondary" disabled={withdrawable === 0}>
          Withdraw
        </Button>
      </Group>
      <DepositTrancheModal
        type={type}
        opened={depositModalOpen}
        onClose={() => setDepositModalOpened(false)}
        decimals={decimals}
      />
    </Card>
  );
};

export default TrancheCard;
