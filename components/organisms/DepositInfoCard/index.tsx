import { Title, Text } from '@components/base';
import { Loader } from '@mantine/core';
import { Card } from '@mantine/core';

const DepositInfoCard: React.FC = () => {
  return (
    <Card style={{ height: 256, padding: '20px 24px' }}>
      <Title order={3}>Deposit</Title>
      <div style={{ marginTop: 20 }}>
        <Text type="secondary">Your Total Deposit</Text>
        <Title order={4}>
          200,000{' '}
          <Text component="span" inherit type="accent">
            TUS
          </Text>{' '}
          {'&'} 5 more...
        </Title>
        <Text size="sm">$200,000.00</Text>
      </div>
      <div style={{ marginTop: 20 }}>
        <Text type="secondary">Your Expected Weekly Yield</Text>
        <Title order={4}>
          200{' '}
          <Text component="span" inherit type="accent">
            TUS
          </Text>{' '}
          {'&'} 5 more...
        </Title>
        <Text size="sm">$200.00</Text>
      </div>
    </Card>
  );
};

export default DepositInfoCard;
