import { Card, Text } from '@components/base';
import { Group } from '@mantine/core';
import Image from 'next/image';
import * as React from 'react';
import LogoLoadingSvg from 'assets/logo-loading.svg';

const SuccessStep: React.FC = () => {
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
          src={LogoLoadingSvg.src}
          alt="Voyage logo"
          height={94}
          width={87}
        />
        <Text sx={{ fontSize: 24 }} mt={36} weight={'bold'} type="gradient">
          Yarr Logged in!
        </Text>
        <Text mt={16} align="center">
          Go back to your original tab
        </Text>
        <Text align="center">You can close this window</Text>
      </Group>
    </Card>
  );
};

export default SuccessStep;
