// noinspection HtmlUnknownTarget
import { Group, Table } from '@mantine/core';
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
  onUpdate: () => void;
};

const BorrowPoolsTable: React.FC<IProps> = ({ vaults, onUpdate }) => {
  const isMounted = useIsMounted();
  const [isBorrowModalOpened, setIsBorrowModalOpened] = useState(false);
  const [clickedVault, setClickedVault] = useState<VaultData>();

  const onBorrowClick = (vault: VaultData) => {
    setClickedVault(vault);
    setIsBorrowModalOpened(true);
  };

  const onModalClosed = () => {
    setClickedVault(undefined);
    setIsBorrowModalOpened(false);
  };

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
              vaults.map((vault: VaultData) => (
                <TableRow
                  key={vault.id}
                  vault={vault}
                  onBorrow={() => onBorrowClick(vault)}
                />
              ))}
          </tbody>
        </Table>
        {clickedVault && (
          <TakeLoanModal
            opened={isBorrowModalOpened}
            vault={clickedVault}
            key={clickedVault.id}
            onClose={onModalClosed}
            onUpdate={onUpdate}
          />
        )}
      </WalletConnectionFence>
    </Group>
  );
};

export default BorrowPoolsTable;
