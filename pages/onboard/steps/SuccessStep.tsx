import { Card, Text } from '@components/base';
import { Group } from '@mantine/core';
import LogoLoadingSvg from 'assets/flag.svg';
import Image from 'next/image';
import * as React from 'react';

const SuccessStep: React.FC = () => {
  return (
    <Card
      style={{
        width: 420,
        margin: 'auto',
        padding: '40px 60px',
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
          Yarrr Now Logged In!
        </Text>
        <Text mt={16} align="center">
          You can now close this tab and head back to your original login window
          to begin your Voyage!
        </Text>
        {/* <Button mt={20} fullWidth onClick={closeWindow}>
          Arr, Matey!
        </Button> */}
      </Group>
    </Card>
  );
};

export default SuccessStep;
