// noinspection HtmlUnknownTarget
import { Group, Loader, Table } from '@mantine/core';
import styles from './index.module.scss';
import { Text, Title } from '@components/base';
import TableRow from './TableRow';
import { VaultData } from 'types';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { useIsMounted } from 'utils/hooks';
import TakeLoanModal from '../TakeLoanModal';
import { useState } from 'react';

type IProps = {
  loading: boolean;
  vaults: VaultData[];
};

const BorrowPoolsTable: React.FC<IProps> = ({ loading, vaults }) => {
  const isMounted = useIsMounted();
  const [isBorrowModalOpened, setIsBorrowModalOpened] = useState(false);
  const columns = [
    'Project',
    'Chain',
    'Total Loans',
    '7D %',
    '24H %',
    'Last 7D Trend',
    'Actions',
  ];

  return (
    <Group direction="column" spacing={0}>
      <Title order={5}>Pools</Title>
      <WalletConnectionFence>
        <Table className={styles.poolsTable} mt={22}>
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
                    align={index <= 1 ? 'left' : 'right'}
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
                vaults.map((vault: VaultData) => (
                  <TableRow
                    key={vault.id}
                    vault={vault}
                    onBorrow={() => setIsBorrowModalOpened(true)}
                  />
                ))
              ))}
          </tbody>
        </Table>
        <TakeLoanModal
          opened={isBorrowModalOpened}
          onClose={() => setIsBorrowModalOpened(false)}
        />
      </WalletConnectionFence>
    </Group>
  );
};

export default BorrowPoolsTable;
