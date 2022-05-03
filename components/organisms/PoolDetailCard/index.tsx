import { Divider, Text, Title, Card } from '@components/base';
import { Group, LoadingOverlay } from '@mantine/core';
import BN from 'bn.js';
import Image from 'next/image';
import { BrandDiscord, BrandTelegram, BrandTwitter } from 'tabler-icons-react';
import { formatBn } from 'utils/bn';

type IProps = {
  reserveSize: BN;
  availableLiquidity: BN;
  seniorAPY: number;
  juniorAPY: number;
  loading: boolean;
};

const PoolDetailCard: React.FC<IProps> = (props) => {
  return (
    <Card style={{ height: '100%' }} px={27}>
      <LoadingOverlay visible={props.loading} />
      <Title>Crabada</Title>
      <Group direction="column" mt={8} spacing={15} align="stretch">
        <Image
          src="/crabada-cover.png"
          alt="crabada"
          layout="responsive"
          width={286}
          height={108}
        />
        <Text>
          <Text weight={700}>
            A Fully Decentralised. <br /> Play-and-Earn Idle Game.
          </Text>
          Rediscover the prosperous ancient Crabada Kingdom once ruled by
          Crustaco, King of the Crabada.
        </Text>
        <Group>
          <BrandTwitter size={16} fill="#A4A5A8" strokeWidth={0} />
          <BrandDiscord size={16} fill="#A4A5A8" strokeWidth={0} />
          <BrandTelegram size={16} fill="#A4A5A8" strokeWidth={0} />
        </Group>
        <Divider orientation="horizontal" />
        <Group spacing={15} direction="column">
          <Group spacing={0} direction="column">
            <Text type="secondary">Reserve Size</Text>
            <Title order={4}>
              {props.reserveSize.toString()}{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">$200,000.00</Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Net Asset Value</Text>
            <Title order={4}>
              500,000{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">$500,000.00</Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Available Liquidity</Text>
            <Title order={4}>
              {props.availableLiquidity.toString()}{' '}
              <Text component="span" inherit type="accent">
                TUS
              </Text>
            </Title>
            <Text size="sm">$1,000.00</Text>
          </Group>
          <Group spacing={0} direction="column">
            <Text type="secondary">Active Vaults</Text>
            <Title order={4}>88</Title>
          </Group>
        </Group>
        <Divider orientation="horizontal" />
        <Group spacing={0} direction="column">
          <Text type="secondary">Senior APY</Text>
          <Title order={4}>{props.seniorAPY}%</Title>
        </Group>
        <Group spacing={0} direction="column">
          <Text type="secondary">Junior APY</Text>
          <Title order={4}>{props.juniorAPY}%</Title>
        </Group>
      </Group>
    </Card>
  );
};

export default PoolDetailCard;
