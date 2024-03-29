import { Button, Card, Text } from '@components/base';
import { Stack } from '@mantine/core';
import SwordImg from 'assets/sword.png';
import Image from 'next/image';
import * as React from 'react';

const RetryStep: React.FC<{ extension_id: string }> = ({ extension_id }) => {
  const onTryClicked = () => {
    window.location.href = `chrome-extension://${extension_id}/reset.html`;
  };

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
          We were unable to verify your session.
        </Text>
        <Text align="center" mt={14}>
          Please try logging in again.
        </Text>
        <Button mt={20} fullWidth onClick={onTryClicked}>
          Try Again
        </Button>
      </Stack>
    </Card>
  );
};

export default RetryStep;
