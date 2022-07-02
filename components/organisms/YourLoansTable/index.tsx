// noinspection HtmlUnknownTarget
import { Group, GroupProps, Loader, Table } from '@mantine/core';
import styles from './index.module.scss';
import { Text, Title } from '@components/base';
import TableRow from './TableRow';
import { VaultData } from 'types';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { useIsMounted } from 'utils/hooks';

type IProps = GroupProps & {
  loading: boolean;
  vaults: VaultData[];
};

const YourLoansTable: React.FC<IProps> = ({ loading, vaults, ...props }) => {
  const isMounted = useIsMounted();

  const columns = [
    'Project',
    'Loan Amount',
    'Repayed Loan',
    'Remaining Loan',
    'Repayments Made',
    'Currently Due',
    'Due Date',
    'Status',
    'Actions',
  ];

  return (
    <Group {...props} direction="column" spacing={0}>
      <Title order={5}>Your Loans</Title>
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
                vaults.map((vault: VaultData) => (
                  <TableRow key={vault.id} vault={vault} />
                ))
              ))}
          </tbody>
        </Table>
      </WalletConnectionFence>
    </Group>
  );
};

export default YourLoansTable;
