import EthereumSvg from '@assets/icons/ethereum.svg';
import { Card, Divider, Text, Title } from '@components/base';
import { useCollectionMetadata } from '@hooks/useCollectionMetadata';
import { DEFAULT_RESERVE_STATE, useReserve } from '@hooks/useReserve';
import { useTwap } from '@hooks/useTwap';
import { Avatar, Group, Skeleton, Stack } from '@mantine/core';
import { normalize } from '@utils/bn';
import { BrandDiscord, BrandTelegram, BrandTwitter } from 'tabler-icons-react';
import styles from './index.module.scss';

interface Props {
  collection: string;
}

const DEFAULT_RESERVE_METADATA = {
  id: '0x26c4214ad23a0634496176c9a53de3d52a3a5286',
  slug: 'mocked-crab',
  createdAt: '2022-09-15T08:24:29.377Z',
  name: 'Loading...',
  image: null,
  banner: null,
  discordUrl: null,
  externalUrl: null,
  twitterUsername: null,
  openseaVerificationStatus: null,
  description: null,
  sampleImages: [],
  tokenCount: '95',
  ownerCount: '88',
  onSaleCount: '14',
  primaryContract: '0x26c4214ad23a0634496176c9a53de3d52a3a5286',
  tokenSetId: 'contract:0x26c4214ad23a0634496176c9a53de3d52a3a5286',
  lastBuy: { value: null },
  floorAsk: {
    id: '0xbdcacdfd78c4187dc83ec717936f43522e85da4e5600e6b18a76ac247d0ee7d7',
    sourceDomain: 'looksrare.org',
    price: {
      currency: {
        contract: '0x0000000000000000000000000000000000000000',
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
      amount: {
        raw: '100000000000000',
        decimal: 0.0001,
        usd: null,
        native: 0.0001,
      },
    },
    maker: '0x7bb17c9401110d05ec39894334cc9d7721e90688',
    validFrom: 1665128826,
    validUntil: 1680680782,
    token: {
      contract: '0x26c4214ad23a0634496176c9a53de3d52a3a5286',
      tokenId: '1042',
      name: null,
    },
  },
  rank: { '1day': null, '7day': 258, '30day': 656, allTime: 3381 },
  volume: { '1day': 0, '7day': 0.001, '30day': 0.0066, allTime: 0.0089 },
  volumeChange: {
    '1day': 0,
    '7day': 0.2857142857142857,
    '30day': 2.869565217391304,
  },
  floorSale: { '1day': 0.0001, '7day': 0.0001, '30day': 0.0001 },
  floorSaleChange: { '1day': 1, '7day': 1, '30day': 1 },
  collectionBidSupported: true,
};

const PoolDetailCard: React.FC<Props> = ({ collection }) => {
  const { data: reserve = DEFAULT_RESERVE_STATE } = useReserve(collection);
  const {
    data: collectionMeta = DEFAULT_RESERVE_METADATA,
    isLoading: isLoadingMetadata,
  } = useCollectionMetadata(collection);
  const {
    data: { twap } = { twap: { price: '0' } },
    isLoading: isLoadingTwap,
  } = useTwap(collection);
  const { currency, totalLiquidity } = reserve;
  const isLoading = isLoadingMetadata || isLoadingTwap;

  return (
    <Card className={styles.root} style={{ height: '100%' }}>
      <Skeleton visible={isLoading}>
        <Title mb={20}>{collectionMeta.name}</Title>
      </Skeleton>
      <Stack mt={8} spacing={15} align="stretch">
        <Skeleton visible={isLoading}>
          <Text sx={{ fontSize: '14px', lineHeight: '16px' }}>
            {collectionMeta.description}
          </Text>
        </Skeleton>
        <Group>
          {collectionMeta.twitterUsername && (
            <a
              target="_blank"
              href={`https://twitter.com/${collectionMeta.twitterUsername}`}
              rel="noopener noreferrer"
              style={{ display: 'inline-flex' }}
            >
              <BrandTwitter
                size={18}
                fill="#A4A5A8"
                strokeWidth={0}
                style={{ cursor: 'pointer' }}
              />
            </a>
          )}
          {collectionMeta.discordUrl && (
            <a
              target="_blank"
              href={collectionMeta.discordUrl}
              rel="noopener noreferrer"
              style={{ display: 'inline-flex' }}
            >
              <BrandDiscord size={18} fill="#A4A5A8" strokeWidth={0} />
            </a>
          )}
          {collectionMeta.telegramUrl && (
            <BrandTelegram size={18} fill="#A4A5A8" strokeWidth={0} />
          )}
        </Group>

        <Divider orientation="horizontal" />

        <Stack>
          <Title order={2}>Collection Stats</Title>
          <Group grow>
            <Stack spacing={4}>
              <Text type="secondary" className={styles.metadataTitle}>
                Collection Size
              </Text>
              <Text className={styles.metadataText}>
                {collectionMeta.tokenCount ?? '0'}
              </Text>
            </Stack>
            <Stack spacing={4}>
              <Text type="secondary" className={styles.metadataTitle}>
                Total Owners
              </Text>
              <Text className={styles.metadataText}>
                {collectionMeta.ownerCount ?? '0'}
              </Text>
            </Stack>
          </Group>
          <Group grow>
            <Stack spacing={4}>
              <Text type="secondary" className={styles.metadataTitle}>
                Total Volume
              </Text>
              <Group spacing={2}>
                <Avatar size={24} src={EthereumSvg.src} />
                <Text className={styles.metadataText}>
                  {collectionMeta.volume?.allTime ?? '0'}
                </Text>
              </Group>
            </Stack>
            <Stack spacing={4}>
              <Text type="secondary" className={styles.metadataTitle}>
                Floor
              </Text>
              <Group spacing={2}>
                <Avatar size={24} src={EthereumSvg.src} />
                <Text className={styles.metadataText}>{twap.price}</Text>
              </Group>
            </Stack>
          </Group>
        </Stack>

        <Divider orientation="horizontal" />

        <Stack>
          <Title order={2}>Reserve Overview</Title>
          <Group grow>
            <Stack spacing={2}>
              <Text type="secondary" className={styles.metadataTitle}>
                Total Reserve Size
              </Text>
              <Group spacing={2}>
                <Avatar size={24} src={EthereumSvg.src} />
                <Text className={styles.metadataText}>
                  {normalize(totalLiquidity, currency.decimals, 5)}
                </Text>
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PoolDetailCard;
