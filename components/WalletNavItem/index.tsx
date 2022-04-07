import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { Group, Avatar, Text, Menu } from '@mantine/core';
import { ChevronDown, Logout } from 'tabler-icons-react';
import ConnectBtn from './ConnectBtn';
import MetamaskSvg from '../../assets/icons/metamask.svg';

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
        <Menu.Item icon={<Logout size={14} />} onClick={disconnect}>
          Disconnect
        </Menu.Item>
      </Menu>
    ) : (
      <ConnectBtn />
    )
  ) : null;
};

export default ConnectWallet;
