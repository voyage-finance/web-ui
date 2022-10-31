import DepositInfoCard from '@components/organisms/DepositInfoCard';
import PoolsTable from '@components/organisms/PoolsTable';
import { Grid, Stack } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from 'styles/Home.module.scss';

const DashboardCardsLine: React.FC = () => (
  <Grid>
    <Grid.Col>
      <DepositInfoCard />
    </Grid.Col>
  </Grid>
);

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>Voyage Lend</title>
        <meta
          name="description"
          content="Voyage is a decentralized leverage trading protocol for NFT traders, backed by @delphi_digital and @tangent_xyz."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack className={styles.main}>
        <DashboardCardsLine />
        <PoolsTable />
      </Stack>
    </div>
  );
};

export default Home;
