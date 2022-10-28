import EthereumSvg from '@assets/icons/ethereum.svg';
import { Button, Card, Divider, Text, Title } from '@components/base';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { useWethBalance } from '@hooks/useWethBalance';
import { Avatar, Grid, Group, LoadingOverlay, Stack } from '@mantine/core';
import {
  Currency,
  TrancheTextMap,
  TrancheType,
  UserTrancheDeposit,
  UserUnbonding,
  VToken,
} from '@types';
import {
  formatPercent,
  normalize,
  rayToPercent,
  wadDiv,
  wadToPercent,
  Zero,
} from '@utils/bn';
import { convertToAssets } from '@utils/vtoken';
import CoinStackImg from 'assets/coin-stack.png';
import CoinsImg from 'assets/two-coins.png';
import BigNumber from 'bignumber.js';
import Image from 'next/image';
import React from 'react';
import { useAccount } from 'wagmi';
import styles from './index.module.scss';

type IProps = {
  tranche: TrancheType;
  apr: BigNumber;
  liquidity: BigNumber;
  currency: Currency;
  vToken: VToken;
  totalUnbonding: BigNumber;
  totalMaxUnderlying: BigNumber;
  userDeposit: UserTrancheDeposit;
  userUnbonding: UserUnbonding;
  isLoading: boolean;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
  onClaimClick?: () => void;
  isApproved?: boolean;
  isApproving?: boolean;
  onApproveClick: () => void;
};

const TrancheCard: React.FC<IProps> = ({
  tranche,
  currency,
  apr,
  liquidity,
  vToken,
  userDeposit,
  userUnbonding,
  totalUnbonding,
  // totalMaxUnderlying,
  isLoading,
  onDepositClick,
  onWithdrawClick,
  onClaimClick = () => undefined,
  isApproved,
  isApproving,
  onApproveClick,
}) => {
  const account = useAccount();
  const isSeniorTranche = tranche === TrancheType.Senior;
  // exclude vToken shares that are currently in unbonding
  const sharesOutstanding = vToken.totalShares.minus(totalUnbonding);
  const share =
    sharesOutstanding.isZero() || vToken.totalShares.isZero()
      ? Zero
      : wadDiv(userDeposit.shares, vToken.totalShares);
  const currentUnbonding = isSeniorTranche
    ? BigNumber.min(
        convertToAssets(
          userUnbonding.shares,
          vToken.totalShares,
          vToken.totalAssets
        ),
        userUnbonding.maxUnderlying
      )
    : Zero;
  const userNetTrancheAssets = userDeposit.assets.minus(currentUnbonding);
  // The formula for computing pnl is sum(withdrawals) + unbonding.maxUnderlying + currentTrancheBalance - sum(deposits)
  // E.g. if you have 100 in the pool, with withdrawals of 20, and you have deposited 100 in your life time, it means your lifetime pnl is 20
  // This can be expressed as 100 + 20 - 100
  const pnl = userDeposit.cumulativeWithdrawals
    .plus(currentUnbonding)
    .plus(userNetTrancheAssets)
    .minus(userDeposit.cumulativeDeposits);
  const { data: availableAssets, isLoading: isLoadingAvailableAssets } =
    useWethBalance(vToken.id);

  const disableWithdraw =
    userDeposit.assets.isZero() || userNetTrancheAssets.isZero();

  return (
    <Card className={styles.root}>
      <LoadingOverlay visible={isLoading} />
      <Grid>
        <Grid.Col md={2}>
          <Group
            align="center"
            sx={{
              position: 'relative',
              height: '120px',
              width: '180px',
              marginBottom: '24px',
            }}
          >
            <Image
              src={tranche === TrancheType.Senior ? CoinsImg : CoinStackImg}
              layout="fill"
              objectFit="contain"
              alt="coins"
            />
          </Group>
          <Stack>
            <Title order={3} sx={{ fontSize: '20px', lineHeight: '24px' }}>
              Important Notice
            </Title>
            <Text>
              {tranche === TrancheType.Senior
                ? 'Deposits made into the Senior Tranche are used solely for lending to borrowers. To learn more on the lender risks involved, read here.'
                : 'Deposits made into the Junior Tranche are used to insure volatility risk at default. To learn more on the lender risks involved, read here.'}
            </Text>
          </Stack>
        </Grid.Col>
        <Grid.Col md={10}>
          <Grid className={styles.trancheStats} mb={20}>
            <Grid.Col md={12}>
              <Title order={3} sx={{ fontSize: '20px', lineHeight: '24px' }}>
                Tranche Overview
              </Title>
            </Grid.Col>
            <Grid.Col md={2}>
              <Text className={styles.subheader} type="secondary">
                <strong>{TrancheTextMap[tranche]}</strong> Tranche Liquidity
              </Text>
              <Group sx={{ gap: '4px' }}>
                <Avatar size={24} src={EthereumSvg.src} />
                <Text className={styles.data}>
                  {normalize(liquidity, currency.decimals, 5)}
                </Text>
              </Group>
            </Grid.Col>
            <Grid.Col md={2}>
              <Text className={styles.subheader} type="secondary">
                <strong>{TrancheTextMap[tranche]}</strong> APY
              </Text>
              <Text className={styles.data}>
                {formatPercent(rayToPercent(apr))}
              </Text>
            </Grid.Col>
          </Grid>
          <Divider orientation="horizontal" mb={24} />
          <WalletConnectionFence>
            <Grid className={styles.trancheStats}>
              <Grid.Col md={12}>
                <Title order={3} sx={{ fontSize: '20px', lineHeight: '24px' }}>
                  Your Pool Stats
                </Title>
              </Grid.Col>
              <Grid.Col md={2}>
                <Text className={styles.subheader} type="secondary">
                  Deposit Balance
                </Text>
                <Group mt={4} sx={{ gap: '4px' }}>
                  <Avatar size={24} src={EthereumSvg.src} />
                  <Text className={styles.data}>
                    {normalize(liquidity, currency.decimals, 5)}
                  </Text>
                </Group>
              </Grid.Col>
              <Grid.Col md={2}>
                <Text className={styles.subheader} type="secondary">
                  Pool Share
                </Text>
                <Text className={styles.data} mt={4}>
                  {formatPercent(wadToPercent(share))}
                </Text>
              </Grid.Col>
              {isSeniorTranche && (
                <Grid.Col md={2}>
                  <Text className={styles.subheader} type="secondary">
                    Unbonding Assets
                  </Text>
                  <Group mt={4} sx={{ gap: '4px' }}>
                    <Avatar size={24} src={EthereumSvg.src} />
                    <Text className={styles.data}>
                      {`${normalize(currentUnbonding, currency.decimals, 5)}`}
                    </Text>
                  </Group>
                </Grid.Col>
              )}
              <Grid.Col md={2}>
                <Text className={styles.subheader} type="secondary">
                  Lifetime PnL
                </Text>
                <Group mt={4} sx={{ gap: '4px' }}>
                  <Avatar size={24} src={EthereumSvg.src} />
                  <Text
                    className={styles.data}
                    style={{
                      color: pnl.isNegative() ? '#F41B6A' : '#0CCDAA',
                    }}
                  >
                    {`${normalize(
                      pnl.isZero() ? '0' : pnl,
                      currency.decimals,
                      5
                    )}`}
                  </Text>
                </Group>
              </Grid.Col>
            </Grid>
          </WalletConnectionFence>
        </Grid.Col>
        {account.isConnected && (
          <Group position="right" sx={{ flex: '1 0 auto' }}>
            {isApproved ? (
              <>
                <Button onClick={onDepositClick} style={{ width: 205 }}>
                  Deposit
                </Button>
                <Button
                  kind="secondary"
                  disabled={disableWithdraw}
                  style={{ width: 205 }}
                  onClick={onWithdrawClick}
                >
                  Withdraw
                </Button>
                {isSeniorTranche && (
                  <Button
                    onClick={onClaimClick}
                    style={{ width: 205 }}
                    disabled={
                      currentUnbonding.isZero() ||
                      isLoadingAvailableAssets ||
                      availableAssets?.isZero()
                    }
                  >
                    Claim
                  </Button>
                )}
              </>
            ) : (
              <Button
                onClick={onApproveClick}
                loading={isApproving}
                mt={16}
                style={{ width: 205, marginLeft: 'auto' }}
              >
                Approve
              </Button>
            )}
          </Group>
        )}
      </Grid>
    </Card>
  );
};

export default TrancheCard;
