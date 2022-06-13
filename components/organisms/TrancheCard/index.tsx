import { Button, Card, Divider, Text, Title } from '@components/base';
import { Box, Group, LoadingOverlay } from '@mantine/core';
import React from 'react';
import { PoolData, TrancheTextMap, TrancheType } from 'types';
import CoinsImg from 'assets/two_coins.png';
import CoinStackImg from 'assets/coin_stack.png';
import Image from 'next/image';
import { useAssetPrice } from 'hooks';
import { ReserveAssets } from '../../../consts';
import { formatAmount, formatPercent, Zero } from 'utils/bn';
import { usdValue } from 'utils/price';
import {
  usePoolDataCtx,
  useSymbolCtx,
  useUserDataCtx,
} from 'hooks/context/usePoolDataCtx';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';

type IProps = {
  type: TrancheType;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
  isApproved?: boolean;
  isApproving?: boolean;
  onApproveClick: () => void;
};

const getLiqiuidityByTranche = (
  poolData: PoolData | undefined,
  tranche: TrancheType
) => {
  if (!poolData) {
    return Zero;
  }

  return tranche === TrancheType.Senior
    ? poolData.seniorTrancheTotalLiquidity
    : poolData.juniorTrancheTotalLiquidity;
};

const TrancheCard: React.FC<IProps> = ({
  type,
  onDepositClick,
  onWithdrawClick,
  isApproved,
  isApproving,
  onApproveClick,
}) => {
  const [priceData] = useAssetPrice(ReserveAssets.TUS);
  const [symbol] = useSymbolCtx();
  const [poolData, isPoolLoading] = usePoolDataCtx();
  const [userData, isUserLoading] = useUserDataCtx();
  // TODO: this should be the user's deposits, not pool deposits
  const liquidity = getLiqiuidityByTranche(poolData, type);
  const currentAPY =
    (type === TrancheType.Senior
      ? poolData?.seniorTrancheLiquidityRate
      : poolData?.juniorTrancheLiquidityRate) || Zero;
  const balance =
    (type === TrancheType.Junior
      ? userData?.juniorTrancheBalance
      : userData?.seniorTrancheBalance) || Zero;
  const trancheShare = !liquidity.isZero()
    ? balance.div(liquidity).multipliedBy(100)
    : Zero;
  const withdrawable =
    (type === TrancheType.Junior
      ? userData?.withdrawableJuniorBalance
      : userData?.withdrawableSeniorBalance) || Zero;
  const unbonding =
    type === TrancheType.Junior
      ? userData?.juniorTrancheBalance?.minus(
          userData?.withdrawableJuniorBalance
        )
      : userData?.seniorTrancheBalance?.minus(
          userData?.withdrawableSeniorBalance
        );
  return (
    <Card
      px={32}
      py={29}
      sx={{
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
      }}
    >
      <LoadingOverlay visible={isPoolLoading || isUserLoading} />
      <Box
        px={30}
        py={20}
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 10,
        }}
      >
        <Group noWrap>
          <Image
            src={type === TrancheType.Senior ? CoinsImg.src : CoinStackImg.src}
            height={60}
            width={90}
            objectFit="contain"
            alt="coins"
          />
          <Text>
            {type === TrancheType.Senior
              ? 'Deposits made into the Senior Tranche are used solely for lending to borrowers. To learn more on the lender risks involved, read here.'
              : 'Deposits made into the Junior Tranche are used to insure volatility risk at default. To learn more on the lender risks involved, read here.'}
          </Text>
        </Group>
      </Box>
      <Group position="apart" mt={16} align="start">
        <Group spacing={0} direction="column">
          <Text type="secondary">{TrancheTextMap[type]} APY</Text>
          <Title order={4}>{formatPercent(currentAPY)}</Title>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">{TrancheTextMap[type]} Tranche Liquidity</Text>
          <Title order={4}>
            {formatAmount(liquidity)}{' '}
            <Text component="span" inherit type="accent">
              {symbol}
            </Text>
          </Title>
          <Text size="sm">{`~${usdValue(
            liquidity,
            priceData.latestPrice
          )}`}</Text>
        </Group>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <WalletConnectionFence my={40}>
        <Group position="apart">
          <Text type="secondary">Current Balance</Text>
          <Group direction="column" spacing={0} align="end">
            <Title order={5}>
              {formatAmount(balance)}{' '}
              <Text weight={400} component="span">
                {symbol}
              </Text>
            </Title>
            <Text type="secondary">{`~${usdValue(
              balance || Zero,
              priceData.latestPrice
            )}`}</Text>
          </Group>
        </Group>
        <Group position="apart" mt={11}>
          <Text type="secondary">Tranche Share</Text>
          {/* TODO */}
          <Title order={5}>{formatPercent(trancheShare)}</Title>
        </Group>
        <Group position="apart" mt={7}>
          <Text type="secondary">Lifetime PnL</Text>
          {/* TODO */}
          <Title order={5} style={{ color: '#0CCDAA' }}>
            +0 TUS
          </Title>
        </Group>
        <Group position="apart" mt={7}>
          <Text type="secondary">Amount Unbonding</Text>
          <Group direction="column" spacing={0} align="end">
            <Title order={5}>
              {formatAmount(unbonding)}{' '}
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
          <Group position="right" mt={16}>
            <Button onClick={onDepositClick} style={{ width: 205 }}>
              Deposit
            </Button>
            <Button
              kind="secondary"
              disabled={withdrawable?.isZero()}
              style={{ width: 205 }}
              onClick={onWithdrawClick}
            >
              Withdraw
            </Button>
          </Group>
        ) : (
          <Group position="right">
            <Button
              onClick={onApproveClick}
              loading={isApproving}
              mt={16}
              style={{ width: 205, marginLeft: 'auto' }}
            >
              Approve
            </Button>
          </Group>
        )}
      </WalletConnectionFence>
    </Card>
  );
};

export default TrancheCard;
