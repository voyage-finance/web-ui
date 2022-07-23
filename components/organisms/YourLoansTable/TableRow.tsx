import { Text, Title } from '@components/base';
import BigNumber from 'bignumber.js';
import { Group } from '@mantine/core';
import Image from 'next/image';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';
import LoanInfoPopover from '@components/moleculas/LoanInfoPopover';
import { CreditLine, Loan } from 'types';
import LoanRow from './LoanRow';
import { Zero } from 'utils/bn';

type IProps = {
  creditLine: CreditLine;
  loans: Loan[];
  onRepayClick: (creditLine: CreditLine, loan: Loan) => void;
};

const TableRow: React.FC<IProps> = ({ creditLine, loans, onRepayClick }) => {
  const symbol = creditLine.symbol;

  const totalPrincipal = loans.reduce(
    (prev: BigNumber, loan) => prev.plus(loan.principal),
    Zero
  );
  // sum(interestPerPayment*paymentCount)
  const totalInterest = loans.reduce(
    (prev: BigNumber, loan) => prev.plus(loan.pmt_interest.multipliedBy(3)),
    Zero
  );
  const totalLoanAmount = totalPrincipal.plus(totalInterest);

  const totalRapayedAmount = loans.reduce(
    (prev: BigNumber, loan) =>
      prev.plus(loan.totalPrincipalPaid.plus(loan.totalInterestPaid)),
    Zero
  );

  const totalRemainingAmount = totalLoanAmount.minus(totalRapayedAmount);

  return (
    <>
      <tr>
        <td style={{ paddingLeft: 0 }}>
          <Group>
            <Image
              src="/crabada-cover.png"
              alt="crabada"
              width={130}
              height={39}
            />
            <Group direction="column" spacing={0}>
              <Title order={5}>
                <Text inherit transform="uppercase">
                  {/* TODO: make it dynamic */}
                  CRABADA
                </Text>
              </Title>
              <Text type="accent" weight="bold">
                {symbol}
              </Text>
            </Group>
          </Group>
        </td>
        <td>
          <LoanInfoPopover
            position="right"
            loan={totalPrincipal}
            interest={totalInterest}
          >
            <AmountWithUSD symbol={symbol} amount={totalLoanAmount} />
          </LoanInfoPopover>
        </td>
        <td>
          <AmountWithUSD
            symbol={symbol}
            amount={totalRapayedAmount}
            kind="success"
          />
        </td>
        <td>
          <AmountWithUSD
            symbol={symbol}
            amount={totalRemainingAmount}
            kind="danger"
          />
        </td>
        <td>
          <Text align="right">—</Text>
        </td>
        <td>
          <Text align="right">—</Text>
        </td>
        <td>
          <Text align="right">—</Text>
        </td>
        <td>
          <Text align="right">—</Text>
        </td>
        <td></td>
      </tr>
      {loans.map((loan, index) => (
        <LoanRow
          key={index}
          loan={loan}
          borderBottom={index === loans.length - 1}
          onRepayClick={() => onRepayClick(creditLine, loan)}
        />
      ))}
    </>
  );
};

export default TableRow;
