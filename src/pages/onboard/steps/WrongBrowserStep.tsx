import { Card, Text } from '@components/base';
import { Stack } from '@mantine/core';
import SwordImg from 'assets/sword.png';
import Image from 'next/image';
import * as React from 'react';

const WrongBrowserStep: React.FC = () => {
  return (
    <Card
      style={{
        width: 420,
        margin: 'auto',
        padding: '40px 53px',
      }}
    >
      <Stack align={'center'} spacing={0}>
        <Image src={SwordImg.src} alt="Voyage logo" height={84} width={111} />
        <Text
          sx={{ fontSize: 24 }}
          mt={18}
          weight={'bold'}
          type="gradient"
          align="center"
        >
          Oops, something went wrong!
        </Text>
        <Text mt={16} align="center" weight={'bold'}>
          It seems like you{"'"}ve opened the magic link on a different browser
          from the Voyage App.
        </Text>
        <Text align="center" mt={14}>
          Please log in again and access the magic link on the same browser.
        </Text>
      </Stack>
    </Card>
  );
};

export default WrongBrowserStep;
