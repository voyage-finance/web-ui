import { Button, Card, Text } from '@components/base';
import Input from '@components/base/Input';
import { Group } from '@mantine/core';
import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { auth } from 'firestore';
import { sendSignInLinkToEmail } from 'firebase/auth';
import { useForm, yupResolver } from '@mantine/form';
import * as Yup from 'yup';

const actionCodeSettings = {
  // TODO: make host address based on environment
  url: 'http://localhost:3000/auth',
  handleCodeInApp: true,
};

const EnterEmailStep: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: yupResolver(
      Yup.object().shape({
        email: Yup.string().email('Invalid email'),
      })
    ),
  });

  const onFormSubmit = () => {
    setIsLoading(true);
    sendSignInLinkToEmail(auth, form.values.email, actionCodeSettings)
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Card
      style={{
        width: 420,
        height: 372,
        margin: 'auto',
        padding: '72px 60px',
      }}
    >
      <form onSubmit={form.onSubmit(onFormSubmit)}>
        <Group direction="column" align={'center'} spacing={0}>
          <Image
            src="/logo-voyage-light.svg"
            alt="Voyage logo"
            height={52.65}
            width={173}
          />
          <Text mt={12}>Supercharge your collection.</Text>
          <Input
            placeholder="Enter Your Email"
            {...form.getInputProps('email')}
            required
            width={300}
            mt={32}
          />
          <Button fullWidth mt={26} loading={isLoading} type="submit">
            Login / Create Wallet
          </Button>
          {error && (
            <Text mt={16} type="danger" align="center">
              Error: {error}
            </Text>
          )}
        </Group>
      </form>
    </Card>
  );
};

export default EnterEmailStep;
