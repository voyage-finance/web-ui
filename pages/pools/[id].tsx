// noinspection HtmlUnknownTarget

import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Grid, LoadingOverlay } from '@mantine/core';
import styles from 'styles/Home.module.scss';
import { Card, Title } from '@components/base';
import PoolDetailCard from '@components/organisms/PoolDetailCard';
import TrancheCard from '@components/organisms/TrancheCard';
import { useAccount, useConnect, useContractRead } from 'wagmi';
import { PoolData, TrancheType } from 'types';
import VoyageProtocolDataProviderAbi from 'abi/VoyageProtocolDataProvider.json';
import { VOYAGE_DATA_PROVIDER_ADDRESS, TUS_ADDRESS } from 'abi/addresses';
import { rayToPercent, shiftDecimals } from 'utils/bn';
import { useEffect } from 'react';
import ConnectingOverlay from '@components/moleculas/ConnectingOverlay';

const ChartCards: React.FC = () => (
  <Grid>
    <Grid.Col span={4}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>TVL</Title>
      </Card>
    </Grid.Col>
    <Grid.Col span={4}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>Utilization rate</Title>
      </Card>
    </Grid.Col>
    <Grid.Col span={4}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>Average Deposit APY</Title>
      </Card>
    </Grid.Col>
  </Grid>
);

const PoolDetailPage: React.FC = () => {
  const { data, isSuccess, isLoading, refetch } = useContractRead(
    {
      addressOrName: VOYAGE_DATA_PROVIDER_ADDRESS,
      contractInterface: VoyageProtocolDataProviderAbi,
    },
    'getPoolData',
    {
      args: TUS_ADDRESS,
    }
  );

  const poolData = isSuccess ? resultToPoolData(data) : undefined;

  return (
    <div>
      <Head>
        <title>Voyage Protocol</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid align="stretch">
          <Grid.Col md={12} lg={3}>
            <PoolDetailCard loading={isLoading!} poolData={poolData} />
          </Grid.Col>
          <Grid.Col md={12} lg={9}>
            <ChartCards />
            <Card style={{ overflow: 'visible' }} mt={16}>
              <Grid>
                <Grid.Col span={6}>
                  <TrancheCard
                    type={TrancheType.Senior}
                    poolData={poolData}
                    withdrawable={0}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TrancheCard
                    type={TrancheType.Junior}
                    poolData={poolData}
                    withdrawable={0}
                  />
                </Grid.Col>
              </Grid>
            </Card>
          </Grid.Col>
        </Grid>
      </main>
    </div>
  );
};

const resultToPoolData = (res: any): PoolData => ({
  totalLiquidity: shiftDecimals(res[0], res[8].toNumber()),
  juniorLiquidity: shiftDecimals(res[1], res[8].toNumber()),
  seniorLiquidity: shiftDecimals(res[2], res[8].toNumber()),
  juniorLiquidityRate: rayToPercent(res[3]),
  seniorLiquidityRate: rayToPercent(res[4]),
  totalDebt: shiftDecimals(res[5], res[8].toNumber()),
  borrowRate: rayToPercent(res[6]),
  trancheRatio: rayToPercent(res[7]),
  decimals: res[8].toNumber(),
});

const PageWrapper: NextPage = () => {
  const { isConnected } = useConnect();

  return isConnected ? <PoolDetailPage /> : <ConnectingOverlay />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
  };
};

export default PageWrapper;
