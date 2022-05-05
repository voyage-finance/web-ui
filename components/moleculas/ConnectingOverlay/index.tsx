import { Title } from '@components/base';
import { Group, Loader } from '@mantine/core';

const ConnectingOverlay: React.FC = () => {
  return (
    <Group direction="column" align="center" position="center">
      <Title order={3}>Wallet is connecting</Title>
      <Loader />
    </Group>
  );
};

export default ConnectingOverlay;
