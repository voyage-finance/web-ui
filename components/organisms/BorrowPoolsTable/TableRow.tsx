import { CTAButton, Text, Title } from '@components/base';
import BigNumber from 'bignumber.js';
import { Avatar, Box, Group } from '@mantine/core';
import Image from 'next/image';
import { formatAmount, Zero } from 'utils/bn';
import { PoolData } from 'types';
import { useAssetPrice } from 'hooks';
import { ReserveAssets } from 'consts';
import { usdValue } from 'utils/price';
import AvalanchePng from '@assets/icons/avalanche.png';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';

const TableRow: React.FC<PoolData> = ({ symbol, totalLiquidity }) => {
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
        <Group spacing={4}>
          <Avatar src={AvalanchePng.src} size={24} />
          <Text>Avalanche</Text>
        </Group>
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={totalLiquidity} />
      </td>
      <td>
        <Text type="success" align="right">
          +51.84%
        </Text>
      </td>
      <td>
        <Text type="success" align="right">
          +10.67%
        </Text>
      </td>
      <td></td>
      <td>
        <Group style={{ justifyContent: 'end' }}>
          <CTAButton>Borrow</CTAButton>
        </Group>
      </td>
    </tr>
  );
};

export default TableRow;
