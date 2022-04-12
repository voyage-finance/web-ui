// noinspection HtmlUnknownTarget
import { Group, Table, Title, Text, Loader } from '@mantine/core';
import styles from 'styles/Home.module.scss';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_POOLS } from 'graphql/queries/pools';
import { useEffect, useState } from 'react';
import { Card } from '@mantine/core';
import CTAButton from '@components/base/CTAButton';

const PoolRow: React.FC<any> = ({
  id,
  name,
  symbol,
  totalLuquidity,
  totalLuquidityUSD,
  seniorLuquidity,
  seniorLuquidityUSD,
  seniorAPY,
  seniorDeposit,
  juniorLuquidity,
  juniorLuquidityUSD,
  juniorAPY,
  juniorDeposit,
}) => {
  return (
    <tr>
      <td>
        <Group>
          <Image
            src="/crabada-cover.png"
            alt="crabada"
            width={130}
            height={39}
          />
          <Group direction="column" spacing={0}>
            <Title order={6}>{name}</Title>
            <Text>{symbol}</Text>
          </Group>
        </Group>
      </td>
      <td>
        <Group direction="column" spacing={0}>
          <Title order={6}>{totalLuquidity}</Title>
          <Text>${totalLuquidityUSD}</Text>
        </Group>
      </td>
      <td>
        <Group direction="column" spacing={0}>
          <Title order={6}>{seniorLuquidity}</Title>
          <Text>${seniorLuquidityUSD}</Text>
        </Group>
      </td>
      <td>
        <Title order={6}>{seniorAPY}%</Title>
      </td>
      <td>
        <Group direction="column" spacing={0}>
          <Title order={6}>{seniorDeposit} TUS</Title>
          <Text>${seniorDeposit}</Text>
        </Group>
      </td>
      <td>
        <Group direction="column" spacing={0}>
          <Title order={6}>{juniorLuquidity}</Title>
          <Text>${juniorLuquidityUSD}</Text>
        </Group>
      </td>
      <td>
        <Title order={6}>{juniorAPY}%</Title>
      </td>
      <td>
        <Title order={6}>{juniorDeposit} TUS</Title>
      </td>
      <td>
        <Group>
          <CTAButton>Deposit</CTAButton>
          <CTAButton>Withdraw</CTAButton>
          <CTAButton>{'More >'}</CTAButton>
        </Group>
      </td>
    </tr>
  );
};

const PoolsTable: React.FC = () => {
  const { loading, error, data } = useQuery(GET_POOLS);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    console.log('[data]', data);
  }, [data]);
  return (
    <Card
      style={{
        padding: 24,
        color: 'white',
      }}
    >
      <Title order={5}>Pools</Title>
      <Table className={styles.poolsTable}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Total Liquidity</th>
            <th>Senior Liquidity</th>
            <th>Senior APY</th>
            <th>Your Deposit</th>
            <th>Junior Liquidity</th>
            <th>Junior APY</th>
            <th>Your Deposit</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mounted &&
            (loading ? (
              <Loader />
            ) : (
              data.pools.map((pool: any) => <PoolRow key={pool.id} {...pool} />)
            ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default PoolsTable;
