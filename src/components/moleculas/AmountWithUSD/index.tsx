import { Text, Title } from '@components/base';
import { Stack } from '@mantine/core';
import { normalize, Zero } from '@utils/bn';
import { usdValue } from '@utils/price';
import BigNumber from 'bignumber.js';
import { ReserveAssets } from 'consts';
import { useAssetPrice } from 'hooks';

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
  const [priceData, priceDataLoading] = useAssetPrice(ReserveAssets.ETH);
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
    <Stack spacing={0} align="end">
      <Title order={5} style={{ color }}>
        {kind === 'success' && '+'}
        {normalize(amount, 18)}{' '}
        <Text weight={400} span style={{ color }}>
          {symbol}
        </Text>
      </Title>
      <Text type="secondary">{amountUSD}</Text>
    </Stack>
  );
};

export default AmountWithUSD;
