import { Text, Title } from '@components/base';
import BigNumber from 'bignumber.js';
import { Group } from '@mantine/core';
import Image from 'next/image';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';
import LoanInfoPopover from '@components/moleculas/LoanInfoPopover';
import { PaymentStatus } from 'types';
import PaymentRow from './PaymentRow';

type PaymentInfo = {
  status: PaymentStatus;
};

const TableRow: React.FC = () => {
  const symbol = 'TUS';
  const totalLiquidity = new BigNumber(100000);

  const payments: PaymentInfo[] = [
    { status: PaymentStatus.UPCOMING },
    { status: PaymentStatus.LATE },
    { status: PaymentStatus.PAID },
  ];

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
                  {/* TODO */}
                  [NAME]
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
            loan={new BigNumber(50000)}
            interest={new BigNumber(50000)}
          >
            <AmountWithUSD symbol={symbol} amount={totalLiquidity} />
          </LoanInfoPopover>
        </td>
        <td>
          <AmountWithUSD
            symbol={symbol}
            amount={totalLiquidity}
            kind="success"
          />
        </td>
        <td>
          <AmountWithUSD
            symbol={symbol}
            amount={totalLiquidity}
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
      {payments.map((payment, index) => (
        <PaymentRow
          key={index}
          status={payment.status}
          borderBottom={index === payments.length - 1}
        />
      ))}
    </>
  );
};

export default TableRow;
