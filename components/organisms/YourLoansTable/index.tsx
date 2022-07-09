// noinspection HtmlUnknownTarget
import { Group, GroupProps, Table } from '@mantine/core';
import styles from './index.module.scss';
import { Text, Title } from '@components/base';
import TableRow from './TableRow';
import { Drawdown, VaultData } from 'types';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { useIsMounted } from 'utils/hooks';
import RepayLoanModal from '../RepayLoanModal';
import { useState } from 'react';

type IProps = GroupProps & {
  loading: boolean;
  vaults: VaultData[];
};

const YourLoansTable: React.FC<IProps> = ({ vaults, ...props }) => {
  const isMounted = useIsMounted();
  const [isRepayModalOpened, setIsRepayModalOpened] = useState(false);
  const [clickedVaultNDrawdown, setClickedVaultNDrawdown] = useState<{
    vault: VaultData;
    drawdown: Drawdown;
  }>();

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

  const onRepayClick = (vault: VaultData, drawdown: Drawdown) => {
    setClickedVaultNDrawdown({ vault, drawdown });
    setIsRepayModalOpened(true);
  };

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
              vaults.map((vault: VaultData) => (
                <TableRow
                  key={vault.id}
                  vault={vault}
                  onRepayClick={onRepayClick}
                />
              ))}
          </tbody>
        </Table>
        <RepayLoanModal
          opened={isRepayModalOpened}
          onClose={() => setIsRepayModalOpened(false)}
          onUpdate={() => undefined}
          vault={clickedVaultNDrawdown?.vault}
          drawdown={clickedVaultNDrawdown?.drawdown}
        />
      </WalletConnectionFence>
    </Group>
  );
};

export default YourLoansTable;
