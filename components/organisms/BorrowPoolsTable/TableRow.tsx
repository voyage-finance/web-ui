import { CTAButton, Text, Title } from '@components/base';
import { Avatar, Group } from '@mantine/core';
import Image from 'next/image';
import { PoolData } from 'types';
import AvalanchePng from '@assets/icons/avalanche.png';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';

const TableRow: React.FC<PoolData> = ({ symbol, totalLiquidity }) => {
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
