import { Button, Card, Text } from '@components/base';
import { Group } from '@mantine/core';
import Image from 'next/image';
import * as React from 'react';
import SwordImg from 'assets/sword.png';

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
      <Group direction="column" align={'center'} spacing={0}>
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
          We could not verify your session or something went wrong
        </Text>
        <Text align="center" mt={14}>
          Please try again
        </Text>
        <Button mt={20} fullWidth onClick={onTryClicked}>
          Try Again
        </Button>
      </Group>
    </Card>
  );
};

export default RetryStep;
