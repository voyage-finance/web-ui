import * as React from 'react';
import { Card, Text, Button } from '@components/base';
import { Box, Group } from '@mantine/core';
import Image from 'next/image';
import SwordImg from 'assets/sword.png';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from 'firestore';

const ConfirmStep: React.FC<{
  email: string;
  fingerPrint: string[];
  onConfirmed: (jwt: string) => void;
}> = ({ email, fingerPrint, onConfirmed }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onConfirm = () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setIsLoading(true);
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          onConfirmed(await result.user.getIdToken());
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      alert('this is not valid signing link');
    }
  };

  return (
    <Card
      style={{
        width: 420,
        margin: 'auto',
        padding: '53px 62px',
        paddingBottom: '40px',
      }}
    >
      <Group direction="column" align={'center'} spacing={0}>
        <Image src={SwordImg.src} alt="Envolope" height={84} width={111} />
        <Text sx={{ fontSize: 24 }} mt={19} weight={'bold'} type="gradient">
          Embark on your Voyage!
        </Text>
        <Text mt={17}>Click on the magic link we’ve sent to</Text>
        <Box
          sx={{
            borderRadius: 10,
            background: 'rgba(27, 29, 44, 0.6)',
            padding: '17px 25px',
            marginTop: 18,
          }}
        >
          <Text type="gradient">{email}</Text>
        </Box>
        <Text weight={'bold'} mt={20}>
          Your Session Emojis
        </Text>
        <Text align="center" mt={18}>
          We want you to be safe on your voyage, so make sure the session emojis
          in your mail line up with these guys below:
        </Text>
        <Group
          spacing={19}
          mt={20}
          position="center"
          sx={{
            borderRadius: 10,
            background: 'rgba(27, 29, 44, 0.6)',
            padding: '5px 25px',
            marginTop: 18,
            width: '100%',
            fontSize: 25,
          }}
        >
          {fingerPrint.map((emoji, index) => (
            <Box key={index}>{emoji}</Box>
          ))}
        </Group>
        <Button mt={20} fullWidth onClick={onConfirm} loading={isLoading}>
          Confirm
        </Button>
      </Group>
    </Card>
  );
};

export default ConfirmStep;
