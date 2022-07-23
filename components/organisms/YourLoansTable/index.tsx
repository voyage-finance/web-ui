// noinspection HtmlUnknownTarget
import { Group, GroupProps, Table } from '@mantine/core';
import styles from './index.module.scss';
import { Text, Title } from '@components/base';
import TableRow from './TableRow';
import { Loan, CreditLine } from 'types';
import WalletConnectionFence from '@components/moleculas/WalletConnectionFence';
import { useIsMounted } from 'utils/hooks';
import RepayLoanModal from '../RepayLoanModal';
import { useState } from 'react';

type IProps = GroupProps & {
  creditLines: CreditLine[];
  loans: Loan[];
};

const YourLoansTable: React.FC<IProps> = ({ creditLines, loans, ...props }) => {
  const isMounted = useIsMounted();
  const [isRepayModalOpened, setIsRepayModalOpened] = useState(false);
  const [clickedLoanNCreditLine, setClickedLoanNCreditLine] = useState<{
    loan: Loan;
    creditLine: CreditLine;
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

  const onRepayClick = (creditLine: CreditLine, loan: Loan) => {
    setClickedLoanNCreditLine({ creditLine, loan });
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
              creditLines.map((creditLine: CreditLine) => (
                <TableRow
                  key={creditLine.id}
                  creditLine={creditLine}
                  loans={loans.filter(
                    (loan: Loan) => loan.symbol === creditLine.symbol
                  )}
                  onRepayClick={onRepayClick}
                />
              ))}
          </tbody>
        </Table>
        {clickedLoanNCreditLine && (
          <RepayLoanModal
            opened={isRepayModalOpened}
            onClose={() => setIsRepayModalOpened(false)}
            onUpdate={() => undefined}
            creditLine={clickedLoanNCreditLine.creditLine}
            loan={clickedLoanNCreditLine.loan}
          />
        )}
      </WalletConnectionFence>
    </Group>
  );
};

export default YourLoansTable;
