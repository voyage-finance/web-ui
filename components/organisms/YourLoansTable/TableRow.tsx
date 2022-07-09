import { Text, Title } from '@components/base';
import BigNumber from 'bignumber.js';
import { Group } from '@mantine/core';
import Image from 'next/image';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';
import LoanInfoPopover from '@components/moleculas/LoanInfoPopover';
import { Drawdown, VaultData } from 'types';
import DrawdownRow from './DrawdownRow';
import { Zero } from 'utils/bn';

type IProps = {
  vault: VaultData;
  onRepayClick: (vault: VaultData, drawdown: Drawdown) => void;
};

const TableRow: React.FC<IProps> = ({ vault, onRepayClick }) => {
  // TODO: fetch it from gql
  const symbol = 'TUS';

  const totalPrincipal = vault.drawdowns.reduce(
    (prev: BigNumber, drawdown) => prev.plus(drawdown.principal),
    Zero
  );
  // sum(interestPerPayment*paymentCount)
  const totalInterest = vault.drawdowns.reduce(
    (prev: BigNumber, drawdown) =>
      prev.plus(drawdown.pmt_interest.multipliedBy(3)),
    Zero
  );
  const totalLoanAmount = totalPrincipal.plus(totalInterest);

  const totalRapayedAmount = vault.drawdowns.reduce(
    (prev: BigNumber, drawdown) =>
      prev.plus(drawdown.totalPrincipalPaid.plus(drawdown.totalInterestPaid)),
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
      {vault.drawdowns.map((drawdown, index) => (
        <DrawdownRow
          key={index}
          drawdown={drawdown}
          borderBottom={index === vault.drawdowns.length - 1}
          onRepayClick={() => onRepayClick(vault, drawdown)}
        />
      ))}
    </>
  );
};

export default TableRow;
