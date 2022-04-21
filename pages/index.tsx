// noinspection HtmlUnknownTarget

import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Group, useMantineTheme } from '@mantine/core';
import styles from 'styles/Home.module.scss';
import PoolsTable from '@components/organisms/PoolsTable';
import { Card, Title } from '@components/base';
import DepositInfoCard from '@components/organisms/DepositInfoCard';

const DashboardCardsLine: React.FC = () => (
  <Grid>
    <Grid.Col span={3}>
      <DepositInfoCard />
    </Grid.Col>
    <Grid.Col span={3}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>TVL</Title>
      </Card>
    </Grid.Col>
    <Grid.Col span={3}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>Utilization rate</Title>
      </Card>
    </Grid.Col>
    <Grid.Col span={3}>
      <Card style={{ height: 256, padding: '20px 24px' }}>
        <Title order={3}>Average Deposit APY</Title>
      </Card>
    </Grid.Col>
  </Grid>
);

const Home: NextPage = () => {
  const { other, colors } = useMantineTheme();

  return (
    <div>
      <Head>
        <title>Voyage Protocol</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Group direction="column" align="stretch">
          <DashboardCardsLine />
          <PoolsTable />
        </Group>
      </main>
    </div>
  );
};

export default Home;
