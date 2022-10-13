import { CTAButton, Text, Title } from '@components/base';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';
import { Group, Image, Skeleton } from '@mantine/core';
import { useCollectionMetadata } from 'hooks/useCollectionMetadata';
import Link from 'next/link';
import { ReserveData } from 'types';
import { formatPercent, rayToPercent } from 'utils/bn';
import { useAccount } from 'wagmi';
import SquashedPepe from '@assets/squashed-pepe.png';

const Placeholder = () => <Image alt="placeholder" src={SquashedPepe.src} />;

const PoolRow: React.FC<ReserveData> = ({
  collection,
  currency: { symbol },
  juniorTrancheLiquidity,
  juniorTrancheDepositRate,
  seniorTrancheLiquidity,
  seniorTrancheDepositRate,
  userDepositData,
  totalLiquidity,
}) => {
  const { loading, data } = useCollectionMetadata(collection);
  const { isDisconnected } = useAccount();
  const userDepositDataAvailable = !isDisconnected && !!userDepositData;
  return (
    <tr>
      <td style={{ paddingLeft: 0 }}>
        <Group>
          <Group>
            <Skeleton visible={loading} style={{ display: 'flex' }}>
              <Image
                alt={data?.name}
                src={data?.image_url}
                width={130}
                height={39}
                placeholder={<Placeholder />}
              />
            </Skeleton>
          </Group>
          <Group direction="column" spacing={0}>
            <Title order={5}>
              <Text inherit transform="uppercase">
                {data?.name}
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
        <AmountWithUSD symbol={symbol} amount={seniorTrancheLiquidity} />
      </td>
      <td>
        <Title order={6} align="right">
          {formatPercent(rayToPercent(seniorTrancheDepositRate))}
        </Title>
      </td>
      <td>
        {userDepositDataAvailable ? (
          <AmountWithUSD
            symbol={symbol}
            amount={userDepositData?.senior.assets}
          />
        ) : (
          <Text inherit align="right">
            -
          </Text>
        )}
      </td>
      <td>
        <AmountWithUSD symbol={symbol} amount={juniorTrancheLiquidity} />
      </td>
      <td align="right">
        <Title order={6}>
          {formatPercent(rayToPercent(juniorTrancheDepositRate))}
        </Title>
      </td>
      <td>
        {userDepositDataAvailable ? (
          <AmountWithUSD
            symbol={symbol}
            amount={userDepositData?.junior.assets}
          />
        ) : (
          <Text inherit align="right">
            -
          </Text>
        )}
      </td>
      <td>
        <Group position="right">
          <CTAButton>
            <Link href={`/pools/${collection}`}>{'More >'}</Link>
          </CTAButton>
        </Group>
      </td>
    </tr>
  );
};

export default PoolRow;
