// noinspection HtmlUnknownTarget
import { Group, Table, Loader, ThemeIcon } from '@mantine/core';
import styles from './index.module.scss';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { GET_POOLS } from 'graphql/queries/pools';
import { useEffect, useState } from 'react';
import { Card, Text, Title, CTAButton } from '@components/base';
import Link from 'next/link';

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
  const BalanceTD = ({ amount, amountUSD }: any) => (
    <Group direction="column" spacing={0} align="end">
      <Title order={5}>
        {amount}{' '}
        <Text weight={400} component="span">
          TUS
        </Text>
      </Title>
      <Text type="secondary">${amountUSD}</Text>
    </Group>
  );
  return (
    <tr>
      <td style={{ paddingLeft: 0 }}>
        <Group>
          <Image
            src="/crabada-cover.png"
            alt="crabada"
            width={130}
            height={39}
          />
          <Group direction="column" spacing={0}>
            <Title order={5}>
              <Text inherit transform="uppercase">
                {name}
              </Text>
            </Title>
            <Text type="accent" weight="bold">
              {symbol}
            </Text>
          </Group>
        </Group>
      </td>
      <td>
        <BalanceTD amount={totalLuquidity} amountUSD={totalLuquidityUSD} />
      </td>
      <td>
        <BalanceTD amount={seniorLuquidity} amountUSD={seniorLuquidityUSD} />
      </td>
      <td>
        <Title order={6} align="right">
          {seniorAPY}%
        </Title>
      </td>
      <td>
        <BalanceTD amount={seniorDeposit} amountUSD={seniorDeposit} />
      </td>
      <td>
        <BalanceTD amount={juniorLuquidity} amountUSD={juniorLuquidityUSD} />
      </td>
      <td align="right">
        <Title order={6}>{juniorAPY}%</Title>
      </td>
      <td>
        <BalanceTD amount={juniorDeposit} amountUSD={juniorDeposit} />
      </td>
      <td>
        <Group style={{ justifyContent: 'end' }}>
          <CTAButton>Deposit</CTAButton>
          <CTAButton>Withdraw</CTAButton>
          <Link href={`/pools/${id}`} passHref>
            <CTAButton>{'More >'}</CTAButton>
          </Link>
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

  const columns = [
    'Project',
    'Total Liquidity',
    'Senior Liquidity',
    'Senior APY',
    'Your Deposit',
    'Junior Liquidity',
    'Junior APY',
    'Your Deposit',
    'Actions',
  ];

  return (
    <Card
      style={{
        padding: 24,
      }}
    >
      <Title order={5}>Pools</Title>
      <Table className={styles.poolsTable}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{ paddingLeft: index === 0 ? 0 : undefined }}
              >
                <Text
                  size="sm"
                  type="secondary"
                  align={index === 0 ? 'left' : 'right'}
                >
                  {column}
                </Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {mounted &&
            (loading ? (
              <td colSpan={9} align="center" style={{ padding: 20 }}>
                <Loader />
              </td>
            ) : (
              data.pools.map((pool: any) => <PoolRow key={pool.id} {...pool} />)
            ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default PoolsTable;
