import { Title } from '@components/base';
import { Loader, Stack } from '@mantine/core';

const ConnectingOverlay: React.FC = () => {
  return (
    <Stack align="center" justify="center">
      <Title order={3}>Wallet is connecting</Title>
      <Loader />
    </Stack>
  );
};

export default ConnectingOverlay;
