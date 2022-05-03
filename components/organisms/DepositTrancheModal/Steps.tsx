import { Divider, Modal, Button, Text, Title } from '@components/base';
import AmountInput from '@components/moleculas/AmountInput';
import { Group } from '@mantine/core';
import Image from 'next/image';
import { useAccount, useContractWrite, useSigner } from 'wagmi';
import VoyagerAbi from 'abi/Voyager.json';
import { VOYAGER_ADDRESS, TUS_ADDRESS } from 'abi/addresses';
import { useForm } from '@mantine/hooks';
import { TrancheTextMap, TrancheType } from 'types';

type IProps1 = {
  type: TrancheType;
  onDeposited: (amount: string) => void;
  onError: (message: string) => void;
};

export const EnterAmountStep: React.FC<IProps1> = ({
  type,
  onDeposited,
  onError,
}) => {
  const [{ data: accountData }] = useAccount({
    fetchEns: true,
  });
  const [{ data: signer }] = useSigner();
  const [{ loading }, deposit] = useContractWrite(
    {
      addressOrName: VOYAGER_ADDRESS,
      contractInterface: VoyagerAbi,
      signerOrProvider: signer,
    },
    'deposit'
  );

  const form = useForm({ initialValues: { amount: '' } });

  const onDeposit = async () => {
    const { error } = await deposit({
      args: [
        TUS_ADDRESS,
        type == TrancheType.Senior ? '1' : '0',
        form.values.amount,
        accountData?.address,
      ],
    });
    if (error) onError(error.message);
    else onDeposited(form.values.amount);
  };

  return (
    <>
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
          <Text type="secondary">{TrancheTextMap[type]} Tranche Liquidity</Text>
          <Title order={4}>
            100,000{' '}
            <Text component="span" inherit type="accent">
              TUS
            </Text>
          </Title>
          <Text size="sm">$100,000.00</Text>
        </Group>
        <Group spacing={0} direction="column" align={'end'}>
          <Text type="secondary">{TrancheTextMap[type]} APY</Text>
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
      <AmountInput mt={16} {...form.getInputProps('amount')} type="number" />
      <Button fullWidth mt={16} onClick={onDeposit} loading={loading}>
        Confirm deposit
      </Button>
    </>
  );
};

type IProps2 = {
  type: TrancheType;
  amount: string;
  error: string;
  onClose: () => void;
};

export const DepositStatusStep: React.FC<IProps2> = ({
  type,
  amount,
  onClose,
  error,
}) => {
  return (
    <>
      <Title order={3} align="center" mt={-32}>
        <Text inherit component={'span'} type="gradient">
          Deposit Success!{' '}
        </Text>
      </Title>
      {!error ? (
        <Text align="center" my={16}>
          You have successfully made a new deposit into the{' '}
          {TrancheTextMap[type]} Tranche. Please view your summary below.
        </Text>
      ) : (
        <Text align="center" my={16}>
          Transaction to deposit into the {TrancheTextMap[type]} Tranche was
          unsuccessfull.
          <Text type="danger">{error}</Text>
        </Text>
      )}
      {!error && (
        <>
          <Image
            src="/crabada-cover.png"
            alt="crabada"
            layout="responsive"
            width={425}
            height={108}
            objectFit="cover"
          />
          <Divider my={16} orientation="horizontal" />
          <Group position="apart">
            <Text type="secondary">Your Deposit Made</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5}>
                +{amount}{' '}
                <Text weight={400} component="span">
                  TUS
                </Text>
              </Title>
              <Text type="secondary">${amount}</Text>
            </Group>
          </Group>
          <Group position="apart" mt={16}>
            <Text type="secondary">Your New Total Deposit</Text>
            <Group direction="column" spacing={0} align="end">
              <Title order={5}>
                <Text inherit type="gradient" component="span">
                  +{amount} TUS
                </Text>
              </Title>
              <Text type="secondary">${amount}</Text>
            </Group>
          </Group>
        </>
      )}
      <Button fullWidth mt={16} onClick={onClose}>
        Done
      </Button>
    </>
  );
};
