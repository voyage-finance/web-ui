import { Title } from '@components/base';
import LineChart, { generateTimeSeries } from '@components/base/LineChart';
import BorrowInfoCard from '@components/organisms/BorrowInfoCard';
import BorrowPoolsTable from '@components/organisms/BorrowPoolsTable';
import BorrowSingupForm from '@components/organisms/BorrowSignupForm';
import YourLoansTable from '@components/organisms/YourLoansTable';
import { Card, Grid, Group, LoadingOverlay } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { useGetUserVaultPools } from 'hooks/useGetUserVaultPools';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import styles from 'styles/Home.module.scss';

const DashboardCardsLine: React.FC = () => (
  <Grid>
    <Grid.Col span={3}>
      <BorrowInfoCard />
    </Grid.Col>
    <Grid.Col span={3}>
      <Card style={{ height: 212, padding: '20px 24px' }}>
        <Title order={3}>Total Global Loans</Title>
        <LineChart
          data={generateTimeSeries(30, [0, 500_000_000], 10000, 0.01)}
        />
      </Card>
    </Grid.Col>
    <Grid.Col span={3}>
      <Card style={{ height: 212, padding: '20px 24px' }}>
        <Title order={3}>Total Loans Taken</Title>
        <LineChart
          name="Total Global Loans"
          data={generateTimeSeries(30, [0, 1], 0.05, 0.01)}
        />
      </Card>
    </Grid.Col>
    <Grid.Col span={3}>
      <Card style={{ height: 212, padding: '20px 24px' }}>
        <Title order={3}>Dungeon Raiders</Title>
        <LineChart
          name="APY"
          data={generateTimeSeries(30, [0, 0.3], 0.05, 0.01)}
        />
      </Card>
    </Grid.Col>
  </Grid>
);

const BorrowPage: NextPage = () => {
  const { loading, data: vaults, refetch } = useGetUserVaultPools();
  const isWhitelisted = vaults.length > 0;
  const interval = useInterval(refetch, 5000);
  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  return (
    <div>
      <Head>
        <title>Voyage Protocol - Borrow Loan</title>
        <meta name="description" content="Voyage finance app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Group direction="column" align="stretch">
          <DashboardCardsLine />
          {!loading && !isWhitelisted ? (
            <BorrowSingupForm />
          ) : (
            <Card
              style={{
                padding: 24,
              }}
            >
              <LoadingOverlay visible={loading} />
              <BorrowPoolsTable
                loading={loading}
                vaults={vaults}
                onUpdate={refetch}
              />
              <YourLoansTable mt={21} vaults={vaults} />
            </Card>
          )}
        </Group>
      </main>
    </div>
  );
};

export default BorrowPage;
