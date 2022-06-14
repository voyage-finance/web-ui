import { CTAButton, Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { formatPercent, Zero } from 'utils/bn';
import { PoolData } from 'types';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';

const PoolRow: React.FC<PoolData> = ({
  symbol,
  juniorTrancheTotalLiquidity,
  juniorTrancheLiquidityRate,
  seniorTrancheTotalLiquidity,
  seniorTrancheLiquidityRate,
  totalLiquidity,
}) => {
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
                {/* TODO: make this dynamic */}
                Crabada
              </Text>
            </Title>
            <Text type="accent" weight="bold">
              {symbol}
            </Text>
          </Group>
        </Group>
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={totalLiquidity} />
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={seniorTrancheTotalLiquidity} />
      </td>
      <td>
        <Title order={6} align="right">
          {formatPercent(seniorTrancheLiquidityRate)}
        </Title>
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={Zero} />
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={juniorTrancheTotalLiquidity} />
      </td>
      <td align="right">
        <Title order={6}>{formatPercent(juniorTrancheLiquidityRate)}</Title>
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={Zero} />
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
