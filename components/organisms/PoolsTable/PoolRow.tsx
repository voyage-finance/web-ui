import { CTAButton, Text, Title } from '@components/base';
import BigNumber from 'bignumber.js';
import { Group } from '@mantine/core';
import Link from 'next/link';
import Image from 'next/image';
import { formatAmount, formatPercent, Zero } from 'utils/bn';
import { PoolData } from 'types';
import { useAssetPrice } from 'hooks';
import { ReserveAssets } from 'consts';
import { usdValue } from 'utils/price';

const PoolRow: React.FC<PoolData> = ({
  symbol,
  juniorTrancheTotalLiquidity,
  juniorTrancheLiquidityRate,
  seniorTrancheTotalLiquidity,
  seniorTrancheLiquidityRate,
  totalLiquidity,
}) => {
  const [priceData, priceDataLoading] = useAssetPrice(ReserveAssets.TUS);

  const BalanceTD = ({ amount }: { amount: BigNumber }) => {
    // imitating that we are receiving BN from server, but for now we receive int number from mock api
    const amountUSD = priceDataLoading
      ? 'Loading...'
      : usdValue(amount ?? Zero, priceData.latestPrice);

    return (
      <Group direction="column" spacing={0} align="end">
        <Title order={5}>
          {formatAmount(amount)}{' '}
          <Text weight={400} component="span">
            {symbol}
          </Text>
        </Title>
        <Text type="secondary">{amountUSD}</Text>
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
        <BalanceTD amount={totalLiquidity} />
      </td>
      <td>
        <BalanceTD amount={seniorTrancheTotalLiquidity} />
      </td>
      <td>
        <Title order={6} align="right">
          {formatPercent(seniorTrancheLiquidityRate)}
        </Title>
      </td>
      <td>
        <BalanceTD amount={Zero} />
      </td>
      <td>
        <BalanceTD amount={juniorTrancheTotalLiquidity} />
      </td>
      <td align="right">
        <Title order={6}>{formatPercent(juniorTrancheLiquidityRate)}</Title>
      </td>
      <td>
        <BalanceTD amount={Zero} />
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
