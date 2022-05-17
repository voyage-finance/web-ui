// noinspection HtmlUnknownTarget
import { Loader, Table } from '@mantine/core';
import styles from './index.module.scss';
import { useQuery } from '@apollo/client';
import { GET_POOLS } from '@graph/queries/pools';
import { useEffect, useState } from 'react';
import { Card, Text, Title } from '@components/base';
import PoolRow, { PoolRowProps } from './PoolRow';

const PoolsTable: React.FC = () => {
  const { loading, data } = useQuery(GET_POOLS);
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
              data.pools.map((pool: PoolRowProps) => (
                <PoolRow key={pool.id} {...pool} />
              ))
            ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default PoolsTable;
