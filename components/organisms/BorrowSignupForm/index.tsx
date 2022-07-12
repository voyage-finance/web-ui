// noinspection HtmlUnknownTarget
import { Group } from '@mantine/core';
import { Button, Card, Text } from '@components/base';
import Input from '@components/base/Input';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

type IProps = {};

const usernameValidator = Yup.string().test(
  'Check prefix',
  'Remove @ character from username.',
  (value) => {
    return !value?.startsWith('@');
  }
);
const schema = Yup.object().shape({
  guildName: Yup.string().min(2, 'Guild Name should have at least 2 letters'),
  name: Yup.string().min(2, 'Name should have at least 2 letters'),
  guildSize: Yup.number().min(
    100,
    'You must be at least 100 to create an account'
  ),
  relation: Yup.string().min(2, 'relation should have at least 2 letters'),
  AUM: Yup.string().min(2, 'AUM should have at least 2 letters'),
  email: Yup.string().email('Invalid email'),
  twitter: usernameValidator,
  telegram: usernameValidator,
  discord: usernameValidator,
});

const BorrowSingupForm: React.FC<IProps> = ({}) => {
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

  const onSubmit = () => undefined;

  return (
    <Card>
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
              <Input
                placeholder="Choose Guild Size"
                label="Guild Size"
                required
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
              <Input
                placeholder="Enter guild AUM"
                label="Guild AUM"
                required
                onChange={() => undefined}
                value={''}
                width={440}
              />
              <Input
                placeholder="Enter your email address"
                label="Email"
                required
                onChange={() => undefined}
                value={''}
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
          <Button style={{ width: 425 }} mt={43} fullWidth type="submit">
            Sign & Submit
          </Button>
        </Group>
      </form>
    </Card>
  );
};

export default BorrowSingupForm;
