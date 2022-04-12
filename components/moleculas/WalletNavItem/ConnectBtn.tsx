import { useConnect } from 'wagmi';
import { useState } from 'react';
import { Modal, Group } from '@mantine/core';
import Button from '@components/base/Button';

const ConnectBtn: React.FC = () => {
  const [{ data: connectData, error }, connect] = useConnect();
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <Button onClick={() => setShowOptions(true)}>Connect wallet</Button>
      <Modal
        opened={showOptions}
        onClose={() => setShowOptions(false)}
        title="Choose wallet option"
      >
        <Group direction="column" align="center">
          {connectData.connectors.map((connector) => (
            <Button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => {
                connect(connector);
                setShowOptions(false);
              }}
              style={{ margin: 'auto' }}
            >
              {connector.name}
              {!connector.ready && ' (unsupported)'}
            </Button>
          ))}
        </Group>
      </Modal>
    </>
  );
};

export default ConnectBtn;
