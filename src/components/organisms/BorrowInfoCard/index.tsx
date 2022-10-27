import { Title, Text } from '@components/base';
import { Card } from '@components/base';

const BorrowInfoCard: React.FC = () => {
  return (
    <Card style={{ height: 212, padding: '20px 24px' }}>
      <Title order={3}>Your Loans</Title>
      <div style={{ marginTop: 20 }}>
        <Text type="secondary">Total Loans</Text>
        <Title order={4}>$100,000,000</Title>
      </div>
      <div style={{ marginTop: 20 }}>
        <Text type="secondary">Outstanding loans</Text>
        <Title order={4}>$100,000</Title>
      </div>
    </Card>
  );
};

export default BorrowInfoCard;
