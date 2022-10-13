import { Card, Text, Title } from '@components/base';
import BigNumber from 'bignumber.js';
import { ReserveAssets } from 'consts';
import { useAssetPrice } from 'hooks';
import { ReserveData } from 'types';
import { normalize, rayDiv, rayMul, rayToWad, wadToRay, Zero } from 'utils/bn';
import { usdValue } from 'utils/price';

interface Props {
  loading: boolean;
  reserves: ReserveData[];
}

const DepositInfoCard: React.FC<Props> = (props) => {
  const { loading, reserves = [] } = props;

  const totalDeposits = reserves.reduce((total, reserve) => {
    const { userDepositData } = reserve;
    const position =
      userDepositData?.junior.assets.plus(userDepositData.senior.assets) ??
      Zero;
    return total.plus(position);
  }, new BigNumber(0));
  const [weightedAverageAPR] = reserves.reduce(
    ([rate, liquidity], reserve) => {
      const numer = rayMul(rate, wadToRay(liquidity)).plus(
        rayMul(reserve.depositRate, wadToRay(reserve.totalLiquidity))
      );
      const denom = liquidity.plus(reserve.totalLiquidity);
      const newRate = rayDiv(numer, wadToRay(denom));
      return [newRate, liquidity.plus(reserve.totalLiquidity)];
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
          {loading ? 'Loading' : normalize(totalDeposits, 18)}
          <Text component="span" inherit type="accent">
            WETH
          </Text>
        </Title>
        <Text>{amountUSD}</Text>
      </div>
      <div style={{ marginTop: 20 }}>
        <Text type="secondary">Your Expected Weekly Yield</Text>
        <Title order={4}>
          {normalize(expectedWeeklyYield, 27)}
          <Text component="span" inherit type="accent">
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
