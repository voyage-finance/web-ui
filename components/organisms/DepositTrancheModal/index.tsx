import { Divider, Text, Title, Modal } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Button, Group, Input, ModalProps, ThemeIcon } from '@mantine/core';
import Image from 'next/image';

type IProps = ModalProps & {
  type: 'Senior' | 'Junior';
};

const DepositTrancheModal: React.FC<IProps> = ({ type, ...props }) => {
  return (
    <Modal title={`Deposit to ${type} Tranche`} centered {...props}>
      <Image
        src="/crabada-cover.png"
        alt="crabada"
        layout="responsive"
        width={425}
        height={108}
        objectFit="cover"
      />
      <Group position="apart" mt={16} align="start">
        <Group spacing={0} direction="column">
          <Text type="secondary">{type} Tranche Liquidity</Text>
          <Title order={4}>
            100,000{' '}
            <Text component="span" inherit type="accent">
              TUS
            </Text>
          </Title>
          <Text size="sm">$100,000.00</Text>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">{type} APY</Text>
          <Title order={4}>217%</Title>
        </Group>
      </Group>
      <Divider my={16} orientation="horizontal" />
      <Group position="apart">
        <Text type="secondary">Your Current Total Deposit</Text>
        <Group direction="column" spacing={0} align="end">
          <Title order={5}>
            1000{' '}
            <Text weight={400} component="span">
              TUS
            </Text>
          </Title>
          <Text type="secondary">$1000</Text>
        </Group>
      </Group>
      <Group position="apart" mt={16}>
        <Text type="secondary">Add Deposit</Text>
        <Text type="secondary" size="xs">
          Balance{' '}
          <Text
            underline
            component="span"
            type="secondary"
            size="xs"
            weight={700}
          >
            10,000 TUS
          </Text>{' '}
        </Text>
      </Group>
      <AmountInput mt={16} />
      <Button fullWidth mt={16}>
        Confirm deposit
      </Button>
    </Modal>
  );
};

export default DepositTrancheModal;
