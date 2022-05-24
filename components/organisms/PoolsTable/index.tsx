// noinspection HtmlUnknownTarget
import { Loader, Table } from '@mantine/core';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Card, Text, Title } from '@components/base';
import PoolRow from './PoolRow';
import { PoolData } from 'types';
import { useGetPools } from 'hooks';

const PoolsTable: React.FC = () => {
  const { loading, data } = useGetPools();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log('[GET_POOLS]', data);
  }, [data]);

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
              data.map((pool: PoolData) => <PoolRow key={pool.id} {...pool} />)
            ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default PoolsTable;
