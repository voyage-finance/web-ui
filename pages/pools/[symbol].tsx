// noinspection HtmlUnknownTarget

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import styles from 'styles/Home.module.scss';
import { Card, Title } from '@components/base';
import PoolDetailCard from '@components/organisms/PoolDetailCard';
import TrancheCard from '@components/organisms/TrancheCard';
import { TrancheType } from 'types';
import {
  useAllowanceApproved,
  useGetPoolData,
  useGetUserPoolData,
} from 'hooks';
import LineChart, { generateTimeSeries } from '@components/base/LineChart';

const ChartCards: React.FC = () => (
  <Grid>
    <Grid.Col span={4}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>TVL</Title>
        <LineChart
          data={generateTimeSeries(30, [0, 500_000_000], 10000, 0.01)}
        />
      </Card>
    </Grid.Col>
    <Grid.Col span={4}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>Utilization rate</Title>
        <LineChart
          name="Utilization Rate"
          data={generateTimeSeries(30, [0, 1], 0.05, 0.01)}
        />
      </Card>
    </Grid.Col>
    <Grid.Col span={4}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>Average Deposit APY</Title>
        <LineChart
          name="APY"
          data={generateTimeSeries(30, [0, 0.3], 0.05, 0.01)}
        />
      </Card>
    </Grid.Col>
  </Grid>
);

const PoolDetailPage: NextPage<{ symbol: string }> = ({ symbol }) => {
  const {
    data: poolData,
    isLoading,
    refetch: refetchPoolData,
  } = useGetPoolData(symbol);

  const [isApproved, isApproving, onApprove] = useAllowanceApproved(symbol);

  const { data: userPoolData, refetch: refetchUserPoolData } =
    useGetUserPoolData(symbol);

  const onDeposited = () => {
    refetchPoolData();
    refetchUserPoolData();
  };

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
            <PoolDetailCard
              loading={isLoading}
              poolData={poolData}
              symbol={symbol}
            />
          </Grid.Col>
          <Grid.Col md={12} lg={9}>
            <ChartCards />
            <Card style={{ overflow: 'visible' }} mt={16}>
              <Grid>
                <Grid.Col span={6}>
                  <TrancheCard
                    type={TrancheType.Senior}
                    poolData={poolData}
                    withdrawable={
                      userPoolData?.withdrawableSeniorTrancheBalance
                    }
                    balance={userPoolData?.seniorTrancheBalance}
                    onDeposited={onDeposited}
                    isApproved={isApproved}
                    isApproving={isApproving}
                    onApprove={onApprove}
                    symbol={symbol}
                  />
                </Grid.Col>
                <Grid.Col span={6}>
                  <TrancheCard
                    type={TrancheType.Junior}
                    poolData={poolData}
                    withdrawable={
                      userPoolData?.withdrawableJuniorTrancheBalance
                    }
                    balance={userPoolData?.juniorTrancheBalance}
                    onDeposited={onDeposited}
                    isApproved={isApproved}
                    isApproving={isApproving}
                    onApprove={onApprove}
                    symbol={symbol}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      symbol: params?.symbol,
    },
  };
};

export default PoolDetailPage;
