// noinspection HtmlUnknownTarget
import { Card, Text, Title } from '@components/base';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { Loader, Table } from '@mantine/core';
import { Reserve } from '@types';
import { useIsMounted } from '@utils/hooks';
import { useReserves } from 'hooks';
import styles from './index.module.scss';
import PoolRow from './PoolRow';

const PoolsTable: React.FC = () => {
  const isMounted = useIsMounted();
  const { isLoading, data: reserves } = useReserves();

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
        display: 'flex',
        flex: '1 0',
        padding: 24,
        flexDirection: 'column',
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
              (isLoading ? (
                <tr>
                  <td colSpan={9} align="center" style={{ padding: 20 }}>
                    <Loader />
                  </td>
                </tr>
              ) : (
                reserves.map((reserve: Reserve) => (
                  <PoolRow key={reserve.id} {...reserve} />
                ))
              ))}
          </tbody>
        </Table>
      </WalletConnectionFence>
    </Card>
  );
};

export default PoolsTable;
