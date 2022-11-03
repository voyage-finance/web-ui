import { Card, Text, Title } from '@components/base';
import { normalize, rayDiv, rayMul, rayToWad, wadToRay, Zero } from '@utils/bn';
import { usdValue } from '@utils/price';
import BigNumber from 'bignumber.js';
import { ReserveAssets } from 'consts';
import { useAssetPrice, useReserves } from 'hooks';

const DepositInfoCard: React.FC = () => {
  const { isLoading, data: reserves } = useReserves();
  const totalDeposits =
    reserves.reduce((total, reserve) => {
      const { userDepositData } = reserve;
      const position =
        userDepositData?.junior.assets.plus(userDepositData?.senior.assets) ??
        Zero;
      return total.plus(position);
    }, new BigNumber(0)) ?? new BigNumber(0);
  const [weightedAverageAPR] = reserves.reduce(
    ([rate = Zero, liquidity = Zero], reserve) => {
      const { depositRate = Zero, totalLiquidity = Zero } = reserve;
      const numer = rayMul(rate, wadToRay(liquidity)).plus(
        rayMul(depositRate, wadToRay(totalLiquidity))
      );
      const denom = liquidity.plus(totalLiquidity);
      const newRate = denom.isZero() ? Zero : rayDiv(numer, wadToRay(denom));
      return [newRate, liquidity.plus(totalLiquidity)];
    },
    [Zero, Zero]
  );
  const expectedWeeklyYield = rayMul(
    weightedAverageAPR.dividedBy(52),
    wadToRay(totalDeposits)
  );
  const [priceData, priceDataLoading] = useAssetPrice(ReserveAssets.ETH);
  const amountUSD = priceDataLoading
    ? 'Loading...'
    : usdValue(totalDeposits, priceData.latestPrice);
  return (
    <Card style={{ height: 256, padding: '20px 24px' }}>
      <Title order={3}>Deposit</Title>
      <div style={{ marginTop: 20 }}>
        <Text type="secondary">Your Total Deposit</Text>
        <Title order={4}>
          {isLoading ? 'Loading' : normalize(totalDeposits, 18)}
          <Text span inherit type="accent">
            WETH
          </Text>
        </Title>
        <Text>{amountUSD}</Text>
      </div>
      <div style={{ marginTop: 20 }}>
        <Text type="secondary">Your Expected Weekly Yield</Text>
        <Title order={4}>
          {normalize(expectedWeeklyYield, 27)}
          <Text span inherit type="accent">
            WETH
          </Text>
        </Title>
        <Text size="sm">
          {usdValue(rayToWad(expectedWeeklyYield), priceData.latestPrice)}
        </Text>
      </div>
    </Card>
  );
};

export default DepositInfoCard;
