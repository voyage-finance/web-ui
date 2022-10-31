import PoolDetailCard from '@components/organisms/PoolDetailCard';
import TrancheDeposits from '@components/organisms/TrancheDeposits';
import { Grid } from '@mantine/core';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import styles from 'styles/Home.module.scss';
import { Address } from 'wagmi';

interface Props {
  collection: Address;
}

const PoolDetailPage: NextPage<Props> = ({ collection }) => {
  return (
    <>
      <Head>
        <title>Voyage Lend</title>
        <meta
          name="description"
          content="Voyage is a decentralized leverage trading protocol for NFT traders, backed by @delphi_digital and @tangent_xyz."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Grid align="stretch" pt={140}>
          <Grid.Col md={12} lg={3}>
            <PoolDetailCard collection={collection} />
          </Grid.Col>
          <Grid.Col md={12} lg={9}>
            <TrancheDeposits collection={collection} />
          </Grid.Col>
        </Grid>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      collection: params?.collection,
    },
  };
};

export default PoolDetailPage;
