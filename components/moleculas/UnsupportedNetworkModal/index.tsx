import { Button, Modal, Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import { getProviderConfiguration } from 'utils/env';
import { useAccount, useNetwork } from 'wagmi';

const UnsupportedNetworkModal: React.FC = () => {
  const { activeChain, switchNetwork } = useNetwork();
  const { data: accountData } = useAccount();
  const currentConf = getProviderConfiguration();
  return (
    <Modal
      opened={accountData !== null && activeChain?.id !== currentConf.chainId}
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
