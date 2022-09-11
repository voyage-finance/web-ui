import { Button, Modal, Text, Title } from '@components/base';
import { Group } from '@mantine/core';
import { resolveProviderConfiguration } from 'utils/env';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

const noop = () => undefined;

const UnsupportedNetworkModal: React.FC = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const account = useAccount();
  const currentConf = resolveProviderConfiguration();
  return (
    <Modal
      opened={account !== null && chain?.id !== currentConf.chainId}
      onClose={noop}
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
