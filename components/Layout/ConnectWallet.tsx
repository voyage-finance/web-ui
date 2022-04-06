import { useConnect, useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import {
  Modal,
  Button,
  Group,
  Avatar,
  Text,
  Menu,
  Divider,
} from '@mantine/core';
import { ChevronDown, Logout } from 'tabler-icons-react';

const ConnectWallet: React.FC = () => {
  const [{ data: connectData, error }, connect] = useConnect();
  const [{ data: accountData }, disconnect] = useAccount({
    fetchEns: true,
  });
  const [showOptions, setShowOptions] = useState(false);

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
          <Group>
            <Avatar src="./metamask.svg" radius="xl" size={20} />
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
      <>
        <Button onClick={() => setShowOptions(true)}>Connect wallet</Button>
        <Modal
          opened={showOptions}
          onClose={() => setShowOptions(false)}
          title="Choose wallet option"
          styles={(theme) => ({
            modal: {
              backgroundColor: theme.colors.dark[6],
              color: 'white',
            },
          })}
        >
          <>
            {connectData.connectors.map((connector) => (
              <Button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect(connector)}
                style={{ margin: 'auto' }}
              >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
              </Button>
            ))}
          </>
        </Modal>
      </>
    )
  ) : null;
};

export default ConnectWallet;
