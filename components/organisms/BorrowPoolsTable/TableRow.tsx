import { CTAButton, Text, Title } from '@components/base';
import { Avatar, Group } from '@mantine/core';
import Image from 'next/image';
import AvalanchePng from '@assets/icons/avalanche.png';
import { VaultData } from 'types';
import AmountWithUSD from '@components/moleculas/AmountWithUSD';
import { ReserveAssets, RESERVE_NAME_MAP } from 'consts';
// import AmountWithUSD from '@components/moleculas/AmountWithUSD';

type IProps = { vault: VaultData; onBorrow: () => void };

const TableRow: React.FC<IProps> = ({ onBorrow, vault }) => {
  const symbol = vault.symbol;
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
                {RESERVE_NAME_MAP[symbol.toLowerCase() as ReserveAssets]}
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
        <AmountWithUSD symbol={symbol} amount={vault.totalDebt} />
      </td>
      <td>
        <Text type="success" align="right">
          +X.XX%
        </Text>
      </td>
      <td>
        <Text type="success" align="right">
          +X.XX%
        </Text>
      </td>
      <td></td>
      <td>
        <Group style={{ justifyContent: 'end' }}>
          <CTAButton onClick={onBorrow}>Borrow</CTAButton>
        </Group>
      </td>
    </tr>
  );
};

export default TableRow;
