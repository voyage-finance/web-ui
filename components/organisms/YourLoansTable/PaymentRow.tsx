import { CTAButton, Text, Title } from '@components/base';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';
import LoanInfoPopover from '@components/moleculas/LoanInfoPopover';
import { createStyles, Group } from '@mantine/core';
import BigNumber from 'bignumber.js';
import { PaymentStatus, PaymentStatusTextMap } from 'types';

const useStyles = createStyles(() => ({
  borderedRow: {
    borderBottom: '1px solid #575b79 !important',
  },
}));

type IProps = {
  status: PaymentStatus;
  borderBottom?: boolean;
};

const PaymentRow: React.FC<IProps> = ({ status, borderBottom }) => {
  const { classes } = useStyles();
  const symbol = 'TUS';
  const totalLiquidity = new BigNumber(100000);

  const statusColor = (function () {
    switch (status) {
      case PaymentStatus.UPCOMING:
        return '#FFA620';
      case PaymentStatus.LATE:
      case PaymentStatus.LIQUIDATED:
        return '#F41B6A';
      case PaymentStatus.PAID:
        return '#0CCDAA';
    }
  })();

  return (
    <tr className={borderBottom ? classes.borderedRow : undefined}>
      <td>
        <Group>
          <div style={{ width: 130 }} />

          <Title order={6}>28 JAN 22</Title>
        </Group>
      </td>
      <td>
        <LoanInfoPopover
          position="right"
          loan={new BigNumber(50000)}
          interest={new BigNumber(50000)}
        >
          <AmountWithUSD symbol={symbol} amount={totalLiquidity} />
        </LoanInfoPopover>
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={totalLiquidity} kind="success" />
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={totalLiquidity} kind="danger" />
      </td>
      <td>
        <Text align="right">x of 3</Text>
      </td>
      <td>
        <Text align="right">10,000 TUS</Text>
      </td>
      <td>
        <Text align="right">12 JUN</Text>
      </td>
      <td>
        <Text align="right" style={{ color: statusColor }}>
          {PaymentStatusTextMap[status]}
        </Text>
      </td>
      <td>
        <Group position="right">
          <CTAButton>Repay</CTAButton>
        </Group>
      </td>
    </tr>
  );
};

export default PaymentRow;
