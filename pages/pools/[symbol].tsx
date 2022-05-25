// noinspection HtmlUnknownTarget

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import styles from 'styles/Home.module.scss';
import { Card, Title } from '@components/base';
import PoolDetailCard from '@components/organisms/PoolDetailCard';
import TrancheCard from '@components/organisms/TrancheCard';
import { TrancheType } from 'types';
import { useAllowanceApproved, useGetPool, useGetUserPoolData } from 'hooks';
import LineChart, { generateTimeSeries } from '@components/base/LineChart';
import TrancheDeposits from '@components/organisms/TrancheDeposits';

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
  const { data: poolData, loading } = useGetPool(symbol);

  const onDeposited = () => {
    // TODO refetchPoolData();
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
              loading={loading}
              poolData={poolData}
              symbol={symbol}
            />
          </Grid.Col>
          <Grid.Col md={12} lg={9}>
            <ChartCards />
            <Grid>
              <Grid.Col md={12} lg={8}>
                <TrancheDeposits
                  poolData={poolData}
                  onDeposited={onDeposited}
                  symbol={symbol}
                />
              </Grid.Col>
              <Grid.Col md={12} lg={4}></Grid.Col>
            </Grid>
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
