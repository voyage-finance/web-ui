// noinspection HtmlUnknownTarget
import { Group } from '@mantine/core';
import { Button, Text } from '@components/base';
import Input from '@components/base/Input';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';
import firestore from 'firestore';
import { doc, setDoc } from 'firebase/firestore';
import Select from '@components/base/Select';
import { useState } from 'react';
import showNotification from 'utils/notification';
import { useAccount } from 'wagmi';

type IProps = {
  onSubmitted: () => void;
};

const Form: React.FC<IProps> = ({ onSubmitted }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: accountData } = useAccount();
  const form = useForm({
    initialValues: {
      guildName: '',
      name: '',
      guildSize: 0,
      relation: '',
      AUM: '',
      email: '',
      twitter: '',
      telegram: '',
      discord: '',
      url: '',
    },
    validate: yupResolver(schema),
  });

  const onSubmit = async () => {
    try {
      if (accountData?.address) {
        setIsSubmitting(true);
        await setDoc(
          doc(firestore, 'borrowers', accountData.address),
          form.values
        );
        showNotification({
          title: 'Submission success',
          message: 'Form Submitted successfully',
          type: 'success',
        });
        setIsSubmitting(false);
        onSubmitted();
      } else {
        showNotification({
          title: 'Oops....',
          message: 'Could get wallet address',
          type: 'error',
        });
      }
    } catch (e) {
      showNotification({
        title: 'Oops....',
        message: 'Could submit for, error occured',
        type: 'error',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Group direction="column" align="center" spacing={0}>
          <Text type="gradient" size="lg" weight={700}>
            Borrower Signup Form
          </Text>
          <Text mt={20}>
            Your wallet has not been whitelisted. Please provide your details
            below to get yarrr borrower account set up.{' '}
            <strong>Learn more</strong>
          </Text>
          <Group direction="column" mt={42} spacing={20}>
            <Group align="start">
              <Input
                placeholder="Enter Guild Name"
                label="Guild Name"
                required
                {...form.getInputProps('guildName')}
                width={440}
              />
              <Input
                placeholder="Enter your first and last name"
                label="First & Last Name"
                required
                {...form.getInputProps('name')}
                width={440}
              />
            </Group>
            <Group align="start">
              <Select
                placeholder="Choose Guild Size"
                label="Guild Size"
                required
                data={[
                  { value: '10 or less', label: '10 or less' },
                  { value: '>10', label: '>10' },
                  { value: '>100', label: '>100' },
                  { value: '>1000', label: '>1000' },
                ]}
                {...form.getInputProps('guildSize')}
                width={440}
              />
              <Input
                placeholder="Tell us how you are related to the Guild (e.g. Founder)"
                label="Relation to Guild"
                required
                {...form.getInputProps('relation')}
                width={440}
              />
            </Group>
            <Group align="start">
              <Select
                placeholder="Enter guild AUM"
                label="Guild AUM"
                required
                {...form.getInputProps('AUM')}
                data={[
                  { value: '$10,000 or less ', label: '$10,000 or less ' },
                  { value: '>$10,000', label: '>$10,000' },
                  { value: '>$100,000', label: '>$100,000' },
                  { value: '>$500,000', label: '>$500,000' },
                ]}
                width={440}
              />
              <Input
                placeholder="Enter your email address"
                label="Email"
                required
                {...form.getInputProps('email')}
                width={440}
              />
            </Group>
            <Group align="start">
              <Input
                placeholder="@ Enter Twitter handle"
                label="Twitter"
                required
                width={440}
                {...form.getInputProps('twitter')}
              />
              <Input
                placeholder="@ Enter Telegram handle"
                label="Telegram"
                required
                width={440}
                {...form.getInputProps('telegram')}
              />
            </Group>
            <Group align="start">
              <Input
                placeholder="Enter your guild’s Discord invite link"
                label="Discord"
                required
                {...form.getInputProps('discord')}
                width={440}
              />
              <Input
                placeholder="Enter Your Guild’s Website URL"
                label="Website"
                required
                {...form.getInputProps('url')}
                width={440}
              />
            </Group>
          </Group>
          <Button
            style={{ width: 425 }}
            mt={43}
            loading={isSubmitting}
            disabled={isSubmitting}
            fullWidth
            type="submit"
          >
            Sign & Submit
          </Button>
        </Group>
      </form>
    </>
  );
};

export default Form;

const usernameValidator = Yup.string()
  .required('this is required field')
  .test('Check prefix', 'Remove @ character from username.', (value) => {
    return !value?.startsWith('@');
  });

const schema = Yup.object().shape({
  guildName: Yup.string().required('Guild Name is required field'),
  name: Yup.string().required('Name is required field'),
  guildSize: Yup.string().required('Guild Size is required field'),
  relation: Yup.string().required('Relation is required field'),
  AUM: Yup.string().required(),
  email: Yup.string().email('Invalid email'),
  twitter: usernameValidator,
  telegram: usernameValidator,
  discord: usernameValidator,
});
