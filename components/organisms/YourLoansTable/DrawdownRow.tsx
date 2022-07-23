import { CTAButton, Text, Title } from '@components/base';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';
import LoanInfoPopover from '@components/moleculas/LoanInfoPopover';
import LoanPmtStatus from '@components/moleculas/LoanPmtStatus';
import { createStyles, Group } from '@mantine/core';
import moment from 'moment';
import { Loan } from 'types';
import { formatAmount } from 'utils/bn';

const useStyles = createStyles(() => ({
  borderedRow: {
    borderBottom: '1px solid #575b79 !important',
  },
}));

type IProps = {
  loan: Loan;
  borderBottom?: boolean;
  onRepayClick: () => void;
};

const PaymentRow: React.FC<IProps> = ({ loan, borderBottom, onRepayClick }) => {
  const { classes } = useStyles();
  const symbol = loan.symbol;
  const totalInterest = loan.pmt_interest.multipliedBy(3);
  const totalLoan = loan.principal.plus(totalInterest);
  const remainingLoan = totalLoan.minus(
    loan.totalInterestPaid.plus(loan.totalPrincipalPaid)
  );

  const nextDate = moment(loan.nextPaymentDue * 1000).format('DD MMM');
  const borrowDate = moment(loan.borrowAt * 1000).format('DD MMM');

  return (
    <tr className={borderBottom ? classes.borderedRow : undefined}>
      <td>
        <Group>
          <div style={{ width: 130 }} />

          <Title order={6}>{borrowDate}</Title>
        </Group>
      </td>
      <td>
        <LoanInfoPopover
          position="right"
          loan={loan.principal}
          interest={totalInterest}
        >
          <AmountWithUSD symbol={symbol} amount={totalLoan} />
        </LoanInfoPopover>
      </td>
      <td>
        <AmountWithUSD
          symbol={symbol}
          amount={loan.totalPrincipalPaid}
          kind="success"
        />
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={remainingLoan} kind="danger" />
      </td>
      <td>
        <Text align="right">{loan.paidTimes.toString()} of 3</Text>
      </td>
      <td>
        <Text align="right">
          {formatAmount(loan.pmt_payment)} {symbol}
        </Text>
      </td>
      <td>
        <Text align="right">{nextDate}</Text>
      </td>
      <td>
        <LoanPmtStatus drawdown={loan} />
      </td>
      <td>
        <Group position="right">
          <CTAButton onClick={onRepayClick}>Repay</CTAButton>
        </Group>
      </td>
    </tr>
  );
};

export default PaymentRow;
