import { Button, Card, Divider, Text, Title } from '@components/base';
import { Center, Group } from '@mantine/core';
import BigNumber from 'bignumber.js';
import { TrancheType } from 'types';
import { formatAmount } from 'utils/bn';

type IUnbonding = {
  type: TrancheType;
  daysLeft: number;
  amount: BigNumber;
};

const UnbondingsCard: React.FC = () => {
  const unbondings: IUnbonding[] = [
    {
      type: TrancheType.Junior,
      daysLeft: 0,
      amount: new BigNumber(1593),
    },
    {
      type: TrancheType.Senior,
      daysLeft: 0,
      amount: new BigNumber(243),
    },
    {
      type: TrancheType.Junior,
      daysLeft: 10,
      amount: new BigNumber(1593),
    },
    {
      type: TrancheType.Junior,
      daysLeft: 14,
      amount: new BigNumber(1593),
    },
    {
      type: TrancheType.Senior,
      daysLeft: 2,
      amount: new BigNumber(1593),
    },
  ];
  return (
    <Card style={{ height: '100%' }} px={24} py={20}>
      <Group direction="column" style={{ height: '100%' }} align="stretch">
        <Group position="apart">
          <Title order={5}>Unbonding</Title>
          {unbondings.length > 0 && (
            <Button size="s" kind="secondary" sx={{ width: 80 }}>
              Claim All
            </Button>
          )}
        </Group>
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
            {unbondings.map((unbonding, index) => (
              <>
                <Group key={index} align="start" mt={15} mb={18}>
                  <Center
                    sx={(theme) => ({
                      background:
                        unbonding.type === TrancheType.Senior
                          ? theme.colors['accent-blue'][5]
                          : theme.colors['accent-pink'][6],
                      borderRadius: 4,
                      width: 25,
                      height: 25,
                    })}
                  >
                    <Text size="sm" weight="bold">
                      {unbonding.type === TrancheType.Senior ? 'S' : 'JR'}
                    </Text>
                  </Center>
                  <Group direction="column" spacing={0} mt={-6}>
                    <Text size="lg">
                      <strong>{formatAmount(unbonding.amount)}</strong> TUS
                    </Text>
                    <Text
                      size="sm"
                      type={unbonding.daysLeft === 0 ? 'success' : 'secondary'}
                    >
                      {unbonding.daysLeft === 0
                        ? 'Ready'
                        : `${unbonding.daysLeft}D Remaining`}
                    </Text>
                  </Group>
                  <Button
                    size="s"
                    kind="secondary"
                    ml="auto"
                    disabled={unbonding.daysLeft > 0}
                    sx={{ width: 80, fontSize: 11 }}
                  >
                    Claim
                  </Button>
                </Group>
                {index < unbondings.length - 1 && <Divider />}
              </>
            ))}
          </Group>
        )}
      </Group>
    </Card>
  );
};

export default UnbondingsCard;
