import { Divider, Text, Title, Card } from '@components/base';
import { Group, LoadingOverlay } from '@mantine/core';
import Image from 'next/image';
import { BrandDiscord, BrandTelegram, BrandTwitter } from 'tabler-icons-react';
import { formatDecimals, fromBigNumber } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { PoolData } from 'types';

type IProps = {
  poolData?: PoolData;
  loading: boolean;
};

const PoolDetailCard: React.FC<IProps> = ({ poolData, loading }) => {
  return (
    <Card style={{ height: '100%' }} px={27}>
      <LoadingOverlay visible={loading} />
      <Title>Crabada</Title>
      <Group direction="column" mt={8} spacing={15} align="stretch">
        <Image
          src="/crabada-cover.png"
          alt="crabada"
          layout="responsive"
          width={286}
          height={108}
        />
        <Text>
          <Text weight={700}>
            A Fully Decentralised. <br /> Play-and-Earn Idle Game.
          </Text>
          Rediscover the prosperous ancient Crabada Kingdom once ruled by
          Crustaco, King of the Crabada.
        </Text>
        <Group>
          <BrandTwitter size={16} fill="#A4A5A8" strokeWidth={0} />
          <BrandDiscord size={16} fill="#A4A5A8" strokeWidth={0} />
          <BrandTelegram size={16} fill="#A4A5A8" strokeWidth={0} />
        </Group>
        <Divider orientation="horizontal" />
        <Group spacing={15} direction="column">
          <Group spacing={0} direction="column">
            <Text type="secondary">Reserve Size</Text>
            <Title order={4}>
              {poolData &&
                poolData.totalLiquidity
                  .minus(poolData.totalDebt)
                  .toString()}{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">$00,000.00</Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Net Asset Value</Text>
            <Title order={4}>
              0,000{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">$00,000.00</Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Available Liquidity</Text>
            <Title order={4}>
              {poolData && poolData.totalLiquidity.toString()}{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">$0,000.00</Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Active Vaults</Text>
            <Title order={4}>-</Title>
          </Group>
        </Group>
        <Divider orientation="horizontal" />
        <Group spacing={0} direction="column">
          <Text type="secondary">Senior APY</Text>
          <Title order={4}>
            {poolData && poolData.seniorLiquidityRate.toString()}%
          </Title>
        </Group>
        <Group spacing={0} direction="column">
          <Text type="secondary">Junior APY</Text>
          <Title order={4}>
            {poolData && poolData.juniorLiquidityRate.toString()}%
          </Title>
        </Group>
      </Group>
    </Card>
  );
};

export default PoolDetailCard;
