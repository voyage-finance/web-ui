import { CTAButton, Text, Title } from '@components/base';
import BigNumber from 'bignumber.js';
import { Group } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';

export interface PoolRowProps {
  id: string;
  name: string;
  symbol: string;
  totalLiquidity: BigNumber;
  totalLiquidityUSD: BigNumber;
  seniorLiquidity: BigNumber;
  seniorLiquidityUSD: BigNumber;
  seniorAPY: BigNumber;
  seniorDeposit: BigNumber;
  juniorLiquidity: BigNumber;
  juniorLiquidityUSD: BigNumber;
  juniorAPY: BigNumber;
  juniorDeposit: BigNumber;
}

const PoolRow: React.FC<PoolRowProps> = ({
  name,
  symbol,
  totalLiquidity,
  totalLiquidityUSD,
  seniorLiquidity,
  seniorLiquidityUSD,
  seniorAPY,
  seniorDeposit,
  juniorLiquidity,
  juniorLiquidityUSD,
  juniorAPY,
  juniorDeposit,
}) => {
  const BalanceTD = ({
    amount: _amount,
    amountUSD: _amountUSD,
  }: {
    amount: BigNumber;
    amountUSD: BigNumber;
  }) => {
    // imitating that we are receiving BN from server, but for now we receive int number from mock api
    const amount = new BigNumber(_amount);
    const amountUSD = new BigNumber(_amountUSD);

    return (
      <Group direction="column" spacing={0} align="end">
        <Title order={5}>
          {amount.toString()}{' '}
          <Text weight={400} component="span">
            {symbol}
          </Text>
        </Title>
        <Text type="secondary">{amountUSD.toString()}</Text>
      </Group>
    );
  };
  return (
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
                {name}
              </Text>
            </Title>
            <Text type="accent" weight="bold">
              {symbol}
            </Text>
          </Group>
        </Group>
      </td>
      <td>
        <BalanceTD amount={totalLiquidity} amountUSD={totalLiquidityUSD} />
      </td>
      <td>
        <BalanceTD amount={seniorLiquidity} amountUSD={seniorLiquidityUSD} />
      </td>
      <td>
        <Title order={6} align="right">
          {seniorAPY}%
        </Title>
      </td>
      <td>
        <BalanceTD amount={seniorDeposit} amountUSD={seniorDeposit} />
      </td>
      <td>
        <BalanceTD amount={juniorLiquidity} amountUSD={juniorLiquidityUSD} />
      </td>
      <td align="right">
        <Title order={6}>{juniorAPY}%</Title>
      </td>
      <td>
        <BalanceTD amount={juniorDeposit} amountUSD={juniorDeposit} />
      </td>
      <td>
        <Group style={{ justifyContent: 'end' }}>
          <CTAButton>Deposit</CTAButton>
          <CTAButton>Withdraw</CTAButton>
          <CTAButton>
            <Link href={`/pools/TUS`}>{'More >'}</Link>
          </CTAButton>
        </Group>
      </td>
    </tr>
  );
};

export default PoolRow;
