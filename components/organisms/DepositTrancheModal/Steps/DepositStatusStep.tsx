import { Button, Divider, Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import Image from 'next/image';
import { formatAmount, formatPercent, Zero } from 'utils/bn';
import BigNumber from 'bignumber.js';
import { TrancheTextMap, TrancheType } from 'types';
import { useAssetPrice } from 'hooks';
import { ReserveAssets } from 'consts';
import { usdValue } from 'utils/price';
import {
  usePoolDataCtx,
  useSymbolCtx,
  useUserDataCtx,
} from 'hooks/context/usePoolDataCtx';

type IProps2 = {
  type: TrancheType;
  amount: string;
  error: string;
  onClose: () => void;
};

const DepositStatusStep: React.FC<IProps2> = ({
  type,
  amount,
  onClose,
  error,
}) => {
  const [symbol] = useSymbolCtx();
  const [poolData] = usePoolDataCtx();
  const [userData] = useUserDataCtx();
  const [priceData] = useAssetPrice(ReserveAssets.TUS);
  const totalLiquidity = poolData
    ? type == TrancheType.Senior
      ? poolData.seniorTrancheTotalLiquidity
      : poolData.juniorTrancheTotalLiquidity
    : Zero;
  const balance = userData
    ? type === TrancheType.Junior
      ? userData.juniorTrancheBalance
      : userData.seniorTrancheBalance
    : Zero;
  const totalShare = balance.div(totalLiquidity).multipliedBy(100);

  return (
    <>
      <Title order={3} align="center" mt={-32}>
        <Text inherit component={'span'} type="gradient">
          Deposit Success!{' '}
        </Text>
      </Title>
      {!error ? (
        <Text align="center" my={16}>
          You have successfully made a new deposit into the{' '}
          {TrancheTextMap[type]} Tranche. Please view your summary below.
        </Text>
      ) : (
        <Text align="center" my={16}>
          Transaction to deposit into the {TrancheTextMap[type]} Tranche was
          unsuccessfull.
          <Text type="danger">{error}</Text>
        </Text>
      )}
      {!error && (
        <>
          <Image
            src="/crabada-cover.png"
            alt="crabada"
            layout="responsive"
            width={425}
            height={108}
            objectFit="cover"
          />
          <Divider my={16} orientation="horizontal" />
          <Group position="apart" align="start">
            <Text type="secondary">Your Deposit Made</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5} style={{ color: '#0CCDAA' }}>
                + {amount}{' '}
                <Text
                  weight={400}
                  component="span"
                  style={{ color: '#0CCDAA' }}
                >
                  {symbol}
                </Text>
              </Title>
              <Text size="sm" type="secondary">{`~${usdValue(
                new BigNumber(amount),
                priceData.latestPrice
              )}`}</Text>
            </Group>
          </Group>
          <Group position="apart" align="start" mt={16}>
            <Text type="secondary">Your New Total Deposit</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5}>
                <Text inherit type="gradient" component="span">
                  {formatAmount(balance)} {symbol}
                </Text>
              </Title>
              <Text size="sm" type="secondary">{`~${usdValue(
                balance,
                priceData.latestPrice
              )}`}</Text>
            </Group>
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
