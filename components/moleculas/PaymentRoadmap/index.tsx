import { Text } from '@components/base';
import { Box, Group, GroupProps } from '@mantine/core';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import * as React from 'react';
import { formatAmount } from 'utils/bn';

type IPaymentRoadmapProps = GroupProps & {
  amount: string;
  interest: BigNumber;
  symbol: string;
};

const PaymentRoadmap: React.FunctionComponent<IPaymentRoadmapProps> = ({
  amount,
  interest,
  symbol,
  ...props
}) => {
  const pmtDates = [
    moment().add(30, 'days'),
    moment().add(60, 'days'),
    moment().add(90, 'days'),
  ];
  // [amount * (100+interestPercent)/100]/3
  const singlePmtAmount = new BigNumber(amount || '0')
    .multipliedBy(interest.plus(100))
    .dividedBy(300);
  return (
    <Group direction="column" spacing={8} align="stretch" {...props}>
      <Group grow spacing={0}>
        {pmtDates.map((date, index) => (
          <Group direction="column" align="end" spacing={0} key={index}>
            <Text size="sm" type="accent">
              Payment #1 Due
            </Text>
            <Text size="sm">{date.format('D MMM YYYY')}</Text>
            <Box
              mt={8}
              sx={(theme) => ({
                height: 28,
                borderRadius:
                  index === 0
                    ? '10px 0 0 10px'
                    : index === 2
                    ? '0 10px 10px 0'
                    : undefined,
                borderRight: index < 2 ? '1px solid' : undefined,
                borderRightColor: theme.fn.rgba('#fff', 0.35),
                background: theme.fn.rgba('#fff', 0.1),
                color: '#fff',
                textAlign: 'center',
                width: '100%',
              })}
            >
              30D
            </Box>
            <Text size="sm" mt={8}>
              <strong>{formatAmount(singlePmtAmount)}</strong> {symbol}
            </Text>
          </Group>
        ))}
      </Group>
    </Group>
  );
};

export default PaymentRoadmap;
