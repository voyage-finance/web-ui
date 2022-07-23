import * as React from 'react';
import { Text } from '@components/base';
import { Loan } from 'types';
import moment from 'moment';

interface ILoanPmtStatusProps {
  loan: Loan;
}

const LoanPmtStatus: React.FunctionComponent<ILoanPmtStatusProps> = ({
  loan,
}) => {
  const now = moment().valueOf();
  const nextPaymentDate = loan.nextPaymentDue * 1000;
  const isPaymentLate = now < nextPaymentDate;
  return (
    <Text
      align="right"
      style={{ color: isPaymentLate ? '#F41B6A' : '#FFA620' }}
    >
      {isPaymentLate ? 'LATE' : 'UPCOMING'}
    </Text>
  );
};

export default LoanPmtStatus;
