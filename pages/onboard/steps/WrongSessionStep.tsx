import { Card, Text } from '@components/base';
import { Group } from '@mantine/core';
import Image from 'next/image';
import * as React from 'react';
import LogoLoadingSvg from 'assets/logo-loading.svg';

const WrongSessionStep: React.FC = () => {
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
          Oops!
        </Text>
        <Text mt={16} align="center">
          We could not verify your session.
        </Text>
        <Text align="center">Make sure you open link on the same device</Text>
      </Group>
    </Card>
  );
};

export default WrongSessionStep;
