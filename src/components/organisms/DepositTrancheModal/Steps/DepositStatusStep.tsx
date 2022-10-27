import { Button, Text, Title } from '@components/base';
import { DEFAULT_RESERVE_STATE } from '@hooks/useReserve';
import { Group, Stack } from '@mantine/core';
import { TrancheTextMap, TrancheType } from '@types';
import { formatPercent, normalize, Zero } from '@utils/bn';
import { usdValue } from '@utils/price';
import BigNumber from 'bignumber.js';
import { ReserveAssets } from 'consts';
import { useAssetPrice, useReserve } from 'hooks';
import { useAccount } from 'wagmi';

type Props = {
  collection: string;
  tranche: TrancheType;
  amount: string;
  error: string;
  onClose: () => void;
};

const DepositStatusStep: React.FC<Props> = ({
  collection,
  tranche,
  amount,
  onClose,
  error,
}) => {
  const { address } = useAccount();
  const { data: reserve = DEFAULT_RESERVE_STATE } = useReserve(
    collection,
    address
  );
  const [priceData] = useAssetPrice(ReserveAssets.ETH);
  const totalLiquidity =
    (tranche == TrancheType.Senior
      ? reserve?.seniorTrancheLiquidity
      : reserve?.juniorTrancheLiquidity) || Zero;
  const balance =
    (tranche === TrancheType.Junior
      ? reserve.userDepositData?.junior.assets
      : reserve.userDepositData?.senior.assets) || Zero;
  const totalShare = !totalLiquidity.isZero()
    ? balance.div(totalLiquidity).multipliedBy(100)
    : Zero;

  return (
    <>
      <Title order={3} align="center" mt={-32}>
        <Text inherit span type="gradient">
          Deposit Success!{' '}
        </Text>
      </Title>
      {!error ? (
        <Text align="center" my={16}>
          You have successfully made a new deposit into the{' '}
          {TrancheTextMap[tranche]} Tranche. Please view your summary below.
        </Text>
      ) : (
        <Text align="center" my={16}>
          Transaction to deposit into the {TrancheTextMap[tranche]} Tranche was
          unsuccessful.
          <Text type="danger">{error}</Text>
        </Text>
      )}
      {!error && (
        <>
          <Group position="apart" align="start">
            <Text type="secondary">Your Deposit Made</Text>
            <Stack spacing={0} align="end">
              <Title order={5} style={{ color: '#0CCDAA' }}>
                + {normalize(amount, reserve.currency.decimals)}{' '}
                <Text weight={400} span style={{ color: '#0CCDAA' }}>
                  {reserve.currency.symbol}
                </Text>
              </Title>
              <Text size="sm" type="secondary">{`~${usdValue(
                new BigNumber(amount),
                priceData.latestPrice
              )}`}</Text>
            </Stack>
          </Group>
          <Group position="apart" align="start" mt={16}>
            <Text type="secondary">Your New Total Deposit</Text>
            <Stack spacing={0} align="end">
              <Title order={5}>
                <Text inherit type="gradient" span>
                  {normalize(balance.toString(), reserve.currency.decimals)}{' '}
                  {reserve.currency.symbol}
                </Text>
              </Title>
              <Text size="sm" type="secondary">{`~${usdValue(
                balance,
                priceData.latestPrice
              )}`}</Text>
            </Stack>
          </Group>
          <Group position="apart" align="start" mt={16}>
            <Text type="secondary">Your New Tranche Share</Text>
            <Title order={5}>{formatPercent(totalShare)}</Title>
          </Group>
        </>
      )}
      <Button fullWidth mt={26} onClick={onClose}>
        Done
      </Button>
    </>
  );
};

export default DepositStatusStep;
