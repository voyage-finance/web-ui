// noinspection HtmlUnknownTarget
import { Group, Table } from '@mantine/core';
import styles from './index.module.scss';
import { Text, Title } from '@components/base';
import TableRow from './TableRow';
import { CreditLine } from 'types';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { useIsMounted } from 'utils/hooks';
import TakeLoanModal from '../TakeLoanModal';
import { useState } from 'react';

type IProps = {
  loading: boolean;
  creditLines: CreditLine[];
  onUpdate: () => void;
};

const BorrowPoolsTable: React.FC<IProps> = ({ creditLines, onUpdate }) => {
  const isMounted = useIsMounted();
  const [isBorrowModalOpened, setIsBorrowModalOpened] = useState(false);
  const [clickedCreditLine, setClickedCreditLine] = useState<CreditLine>();

  const onCreditLineClick = (vault: CreditLine) => {
    setClickedCreditLine(vault);
    setIsBorrowModalOpened(true);
  };

  const onModalClosed = () => {
    setClickedCreditLine(undefined);
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
              creditLines.map((creditLine: CreditLine) => (
                <TableRow
                  key={creditLine.id}
                  creditLine={creditLine}
                  onBorrow={() => onCreditLineClick(creditLine)}
                />
              ))}
          </tbody>
        </Table>
        {clickedCreditLine && (
          <TakeLoanModal
            opened={isBorrowModalOpened}
            creditLine={clickedCreditLine}
            key={clickedCreditLine.id}
            onClose={onModalClosed}
            onUpdate={onUpdate}
          />
        )}
      </WalletConnectionFence>
    </Group>
  );
};

export default BorrowPoolsTable;
