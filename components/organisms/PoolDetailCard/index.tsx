import { Card, Divider, Text, Title } from '@components/base';
import { Group, LoadingOverlay } from '@mantine/core';
import Image from 'next/image';
import { BrandDiscord, BrandTelegram, BrandTwitter } from 'tabler-icons-react';
import { PoolData } from 'types';
import { useAssetPrice } from '../../../hooks/useAssetPrice';
import { ReserveAssets } from '../../../consts';
import { usdValue } from '../../../utils/price';
import { Zero } from '../../../utils/bn';

type IProps = {
  poolData?: PoolData;
  loading: boolean;
};

const LOADING_COPY = 'Loading...';

const PoolDetailCard: React.FC<IProps> = ({ poolData, loading }) => {
  const [priceData, priceDataLoading] = useAssetPrice(ReserveAssets.TUS);
  console.log('priceDataLoading: ', priceDataLoading);
  console.log('priceData: ', priceData);
  const isLoadingData = loading || priceDataLoading;
  const availableLiquidity = poolData
    ? poolData.totalLiquidity.minus(poolData.totalDebt)
    : Zero;

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
              {poolData && poolData.totalLiquidity.toString()}{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">
              {isLoadingData
                ? 'Loading...'
                : `~${usdValue(
                    poolData?.totalLiquidity ?? Zero,
                    priceData.latestPrice
                  )}`}
            </Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Net Asset Value</Text>
            <Title order={4}>
              {loading ? LOADING_COPY : Zero.toFixed()}{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">{usdValue(Zero, priceData.latestPrice)}</Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Available Liquidity</Text>
            <Title order={4}>
              {availableLiquidity.toFixed()}{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">
              {`~${usdValue(availableLiquidity, priceData.latestPrice)}`}
            </Text>
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
