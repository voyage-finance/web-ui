import { Card, Divider, Text, Title } from '@components/base';
import { Group, LoadingOverlay } from '@mantine/core';
import Image from 'next/image';
import { BrandDiscord, BrandTelegram, BrandTwitter } from 'tabler-icons-react';
import { useAssetPrice } from '../../../hooks/useAssetPrice';
import { ReserveAssets, RESERVE_NAME_MAP } from '../../../consts';
import { usdValue } from '../../../utils/price';
import { formatAmount, formatPercent, Zero } from '../../../utils/bn';
import { usePoolDataCtx, useSymbolCtx } from 'hooks/context/usePoolDataCtx';

const LOADING_COPY = 'Loading...';

const PoolDetailCard: React.FC = () => {
  const [poolData, loading] = usePoolDataCtx();
  const [symbol] = useSymbolCtx();
  const [priceData, priceDataLoading] = useAssetPrice(ReserveAssets.TUS);
  const isLoadingData = loading || priceDataLoading;
  const availableLiquidity = poolData
    ? poolData.totalLiquidity.minus(poolData.totalBorrow)
    : Zero;

  return (
    <Card style={{ height: '100%' }} px={27}>
      <LoadingOverlay visible={loading} />
      <Title>{RESERVE_NAME_MAP[symbol.toLowerCase() as ReserveAssets]}</Title>
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
              {formatAmount(poolData?.totalLiquidity)}{' '}
              <Text component="span" inherit type="accent">
                {symbol}
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
                {symbol}
              </Text>
            </Title>
            <Text size="sm">{usdValue(Zero, priceData.latestPrice)}</Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Available Liquidity</Text>
            <Title order={4}>
              {formatAmount(availableLiquidity)}{' '}
              <Text component="span" inherit type="accent">
                {symbol}
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
            {formatPercent(poolData?.seniorTrancheLiquidityRate)}
          </Title>
        </Group>
        <Group spacing={0} direction="column">
          <Text type="secondary">Junior APY</Text>
          <Title order={4}>
            {formatPercent(poolData?.juniorTrancheLiquidityRate)}
          </Title>
        </Group>
      </Group>
    </Card>
  );
};

export default PoolDetailCard;
