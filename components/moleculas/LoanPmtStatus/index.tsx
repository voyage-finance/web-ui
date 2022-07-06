import * as React from 'react';
import { Text } from '@components/base';
import { Drawdown } from 'types';
import moment from 'moment';

interface ILoanPmtStatusProps {
  drawdown: Drawdown;
}

const LoanPmtStatus: React.FunctionComponent<ILoanPmtStatusProps> = ({
  drawdown,
}) => {
  const now = moment().valueOf();
  const nextPaymentDate = drawdown.nextPaymentDue * 1000;
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
