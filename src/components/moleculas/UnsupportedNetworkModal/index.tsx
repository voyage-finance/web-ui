import { Button, Modal, Text, Title } from '@components/base';
import { Stack } from '@mantine/core';
import c from '@utils/config';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';

const noop = () => undefined;

const UnsupportedNetworkModal: React.FC = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const account = useAccount();
  return (
    <Modal
      opened={account !== null && chain?.id !== c.chainId}
      onClose={noop}
      withCloseButton={false}
    >
      <Stack align="center">
        <Title>Wrong network</Title>
        <Text>Please change to {c.network} network to continue</Text>
        <Button onClick={() => switchNetwork?.(c.chainId)}>
          Switch network
        </Button>
      </Stack>
    </Modal>
  );
};

export default UnsupportedNetworkModal;
