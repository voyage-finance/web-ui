import { Modal, Text } from '@components/base';
import { Avatar, Group, Button } from '@mantine/core';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useConnect } from 'wagmi';
import MetamaskSvg from '@assets/icons/metamask.svg';

const PRIVACY_POLICY_URL = 'https://www.voyage.finance/privacy-policy';

const ConnectWalletModal: React.FC<{
  opened: boolean;
  onClose: () => void;
}> = ({ opened, onClose }) => {
  const { connect } = useConnect();
  const metamaskConnector = new MetaMaskConnector();

  return (
    <Modal opened={opened} onClose={onClose} title="Select a Wallet">
      <Group direction="column" align="stretch">
        <Text>
          By connecting a wallet, I agree to Voyage Finance’s Terms of Use and{' '}
          <Text component="a" href={PRIVACY_POLICY_URL} underline weight="bold">
            Privacy Policy
          </Text>
          .
        </Text>
        <Button
          disabled={!metamaskConnector.ready}
          onClick={() => {
            connect(metamaskConnector);
            onClose();
          }}
          style={{ margin: 'auto' }}
          fullWidth
          sx={(theme) => ({
            background: theme.fn.rgba('#fff', 0.1),
            height: 65,
            '&:hover': {
              background: 'rgba(27, 29, 44, 0.6)',
            },
            '&:disabled': {
              color: 'white !important',
            },
          })}
          styles={{
            inner: {
              justifyContent: 'flex-start',
              padding: '20px 30px',
            },
          }}
          radius={10}
        >
          <Group>
            <Avatar src={MetamaskSvg.src} radius="xl" size={25} />
            <Text weight={400}>Metamask</Text>
          </Group>
        </Button>
        {!metamaskConnector.ready && (
          <Text size="sm" align="center" type="danger">
            Error: Metamask extension not found. Download Metamask to use
            Voyage.
          </Text>
        )}
      </Group>
    </Modal>
  );
};

export default ConnectWalletModal;
