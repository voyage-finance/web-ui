import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { Group, Avatar, Text } from '@mantine/core';
import {
  ArrowUpRight,
  ChevronDown,
  Power,
  Copy,
  Wallet,
  History,
  Settings,
} from 'tabler-icons-react';
import ConnectBtn from './ConnectBtn';
import MetamaskSvg from '@assets/icons/metamask.svg';
import Menu, { MenuItem } from '@components/Menu';
import Divider from '@components/Divider';

const ConnectWallet: React.FC = () => {
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const getShortenedAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.slice(-4)}`;
  };

  return mounted ? (
    accountData ? (
      <Menu
        control={
          <Group
            sx={(theme) => ({
              '&:hover': {
                cursor: 'pointer',
              },
            })}
          >
            <Avatar src={MetamaskSvg.src} radius="xl" size={20} />
            <Text size="sm" color={'white'}>
              {getShortenedAddress(accountData.address)}
            </Text>
            <ChevronDown size={12} color={'white'} />
          </Group>
        }
      >
        <MenuItem icon={<Copy />} rightSection={<ArrowUpRight size={14} />}>
          Copy address
        </MenuItem>
        <Divider />
        <MenuItem icon={<Wallet />}>Balance</MenuItem>
        <MenuItem icon={<History />}>History</MenuItem>
        <MenuItem icon={<Settings />}>Settings</MenuItem>
        <Divider />
        <MenuItem icon={<Power color="#E84747" />} onClick={disconnect}>
          <Text inherit color="#E84747">
            Disconnect
          </Text>
        </MenuItem>
      </Menu>
    ) : (
      <ConnectBtn />
    )
  ) : null;
};

export default ConnectWallet;
