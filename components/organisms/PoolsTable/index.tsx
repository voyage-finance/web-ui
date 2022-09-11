// noinspection HtmlUnknownTarget
import { Card, Text, Title } from '@components/base';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { Loader, Table } from '@mantine/core';
import { ReserveData } from 'types';
import { useIsMounted } from 'utils/hooks';
import styles from './index.module.scss';
import PoolRow from './PoolRow';

interface Props {
  loading: boolean;
  reserves: ReserveData[];
}

const PoolsTable: React.FC<Props> = (props) => {
  const isMounted = useIsMounted();
  const { loading, reserves } = props;

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
                reserves.map((reserve: ReserveData) => (
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
