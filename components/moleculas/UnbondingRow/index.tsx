import { Center, Group } from '@mantine/core';
import { Text, Button } from '@components/base';
import { TrancheType, Unbonding } from 'types';
import { formatAmount } from 'utils/bn';
import BigNumber from 'bignumber.js';
import moment from 'moment';

const LOCK_DAYS = 14;

const daysLeft = (seconds: BigNumber) => {
  const date = moment(seconds.toNumber() * 1000);
  const now = moment();
  const daysLeft = Math.max(LOCK_DAYS - now.diff(date, 'days'), 0);
  return daysLeft;
};

const UnbondingRow: React.FC<{ unbonding: Unbonding }> = ({ unbonding }) => {
  const days = daysLeft(unbonding.time);
  return (
    <Group align="start" mt={15} mb={18}>
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
        <Text size="sm" type={days === 0 ? 'success' : 'secondary'}>
          {days === 0 ? 'Ready' : `${days}D Remaining`}
        </Text>
      </Group>
      <Button
        size="s"
        kind="secondary"
        ml="auto"
        disabled={days > 0}
        sx={{ width: 80, fontSize: 11 }}
      >
        Claim
      </Button>
    </Group>
  );
};

export default UnbondingRow;
