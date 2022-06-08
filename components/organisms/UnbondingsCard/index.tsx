import { Button, Card, Divider, Text, Title } from '@components/base';
import UnbondingRow from '@components/moleculas/UnbondingRow';
import WalletNotConnectedContainer from '@components/moleculas/WalletConnectionFence';
import { Center, Group, LoadingOverlay } from '@mantine/core';
import { useUserDataCtx } from 'hooks/context/usePoolDataCtx';

const UnbondingsCard: React.FC = () => {
  const [user, isLoading] = useUserDataCtx();
  const unbondings = user?.unbondings || [];
  return (
    <Card style={{ height: '100%' }} px={24} py={20}>
      <LoadingOverlay visible={isLoading} />
      <Group direction="column" style={{ height: '100%' }} align="stretch">
        <Group position="apart">
          <Title order={5}>Unbonding</Title>
          {unbondings.length > 0 && (
            <Button size="s" kind="secondary" sx={{ width: 80 }}>
              Claim All
            </Button>
          )}
        </Group>
        <WalletNotConnectedContainer sx={{ flexGrow: 1 }}>
          {unbondings.length === 0 ? (
            <Center style={{ flexGrow: 1 }}>
              <Text align="center" style={{ width: 245 }}>
                <strong>
                  Withdrawn deposits will enter a 14-day unbonding phase.
                </strong>{' '}
                You currently do not have any withdrawals.
              </Text>
            </Center>
          ) : (
            <Group direction="column" mt={-5} align="stretch" spacing={0}>
              {unbondings.map((unbonding, index) => {
                return (
                  <div key={index}>
                    <UnbondingRow unbonding={unbonding} />
                    {index < unbondings.length - 1 && <Divider />}
                  </div>
                );
              })}
            </Group>
          )}
        </WalletNotConnectedContainer>
      </Group>
    </Card>
  );
};

export default UnbondingsCard;
