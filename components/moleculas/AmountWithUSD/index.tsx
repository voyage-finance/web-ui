import { Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import BigNumber from 'bignumber.js';
import { ReserveAssets } from 'consts';
import { useAssetPrice } from 'hooks';
import { formatAmount, Zero } from 'utils/bn';
import { usdValue } from 'utils/price';

type IProps = {
  amount: BigNumber;
  kind?: 'regular' | 'success' | 'danger';
  symbol: string;
};

const AmountWithUSD: React.FC<IProps> = ({
  amount,
  kind = 'regular',
  symbol,
}) => {
  const [priceData, priceDataLoading] = useAssetPrice(ReserveAssets.TUS);
  const amountUSD = priceDataLoading
    ? 'Loading...'
    : usdValue(amount ?? Zero, priceData.latestPrice);

  const color = (function () {
    switch (kind) {
      case 'regular':
        return '#fff';
      case 'success':
        return '#0CCDAA';
      case 'danger':
        return '#F41B6A';
    }
  })();
  return (
    <Group direction="column" spacing={0} align="end">
      <Title order={5} style={{ color }}>
        {kind === 'success' && '+'}
        {formatAmount(amount)}{' '}
        <Text weight={400} component="span" style={{ color }}>
          {symbol}
        </Text>
      </Title>
      <Text type="secondary">{amountUSD}</Text>
    </Group>
  );
};

export default AmountWithUSD;
