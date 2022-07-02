import { Title } from '@components/base';
import LineChart, { generateTimeSeries } from '@components/base/LineChart';
import BorrowInfoCard from '@components/organisms/BorrowInfoCard';
import BorrowPoolsTable from '@components/organisms/BorrowPoolsTable';
import YourLoansTable from '@components/organisms/YourLoansTable';
import { Card, Grid, Group } from '@mantine/core';
import { useGetUserVaultPools } from 'hooks/useGetUserVaultPools';
import { NextPage } from 'next';
import Head from 'next/head';
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
  const { loading, data: vaults } = useGetUserVaultPools();
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
          <Card
            style={{
              padding: 24,
            }}
          >
            <BorrowPoolsTable loading={loading} vaults={vaults} />
            <YourLoansTable mt={21} loading={loading} vaults={vaults} />
          </Card>
        </Group>
      </main>
    </div>
  );
};

export default BorrowPage;
