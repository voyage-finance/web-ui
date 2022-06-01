// noinspection HtmlUnknownTarget
import { Loader, Table } from '@mantine/core';
import styles from './index.module.scss';
import { Card, Text, Title } from '@components/base';
import PoolRow from './PoolRow';
import { PoolData } from 'types';
import { useGetPools } from 'hooks';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { useIsMounted } from 'utils/hooks';

const PoolsTable: React.FC = () => {
  const { loading, data } = useGetPools();
  const isMounted = useIsMounted();

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
      <WalletConnectionFence my={40}>
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
            {isMounted &&
              (loading ? (
                <td colSpan={9} align="center" style={{ padding: 20 }}>
                  <Loader />
                </td>
              ) : (
                data.map((pool: PoolData) => (
                  <PoolRow key={pool.id} {...pool} />
                ))
              ))}
          </tbody>
        </Table>
      </WalletConnectionFence>
    </Card>
  );
};

export default PoolsTable;
