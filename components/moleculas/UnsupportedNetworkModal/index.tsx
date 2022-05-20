import { Button, Modal, Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import { useEffect } from 'react';
import { getProviderConfiguration } from 'utils/env';
import { useNetwork } from 'wagmi';

const UnsupportedNetworkModal: React.FC = () => {
  const { activeChain, switchNetwork } = useNetwork();
  const currentConf = getProviderConfiguration();
  useEffect(() => {
    console.log(
      '[UnsupportedNetworkModal]',
      activeChain,
      switchNetwork,
      currentConf
    );
  }, []);
  return (
    <Modal
      opened={activeChain?.id !== currentConf.chainId}
      onClose={() => {}}
      withCloseButton={false}
    >
      <Group direction="column" align="center">
        <Title>Wrong network</Title>
        <Text>Please change to {currentConf.name} network to continue</Text>
        <Button onClick={() => switchNetwork?.(currentConf.chainId)}>
          Switch network
        </Button>
      </Group>
    </Modal>
  );
};

export default UnsupportedNetworkModal;
