import { Button, Card, Text } from '@components/base';
import Input from '@components/base/Input';
import { Group } from '@mantine/core';
import Image from 'next/image';
import * as React from 'react';

const EnterEmailStep: React.FC = () => {
  return (
    <Card
      style={{
        width: 420,
        margin: 'auto',
        padding: '72px 60px',
      }}
    >
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
          value={''}
          onChange={() => undefined}
          required
          width={300}
          mt={32}
        />
        <Button fullWidth mt={26}>
          Login / Create Wallet
        </Button>
      </Group>
    </Card>
  );
};

export default EnterEmailStep;
