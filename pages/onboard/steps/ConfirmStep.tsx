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
  onConfirmed: (sessionInfo: any) => void;
}> = ({ email, fingerPrint, onConfirmed }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onConfirm = () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      setIsLoading(true);
      signInWithEmailLink(auth, email, window.location.href)
        .then(async (result) => {
          console.log('----- result -----', result);
          const sessionInfo = {
            jwt: await result.user.getIdToken(),
            accessToken: (result.user as any).accessToken || '',
            uid: result.user.uid,
          };
          onConfirmed(sessionInfo);
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
          Ready for Your Voyage?
        </Text>
        <Text mt={17} align="center">
          Cross-check if the session emojis below matches those on the login
          window. Once verified, click <strong>Confirm</strong> to begin your
          voyage.
        </Text>
        <Text weight={'bold'} mt={20}>
          Your Session Emojis
        </Text>
        <Group
          spacing={19}
          mt={20}
          position="center"
          noWrap={true}
          sx={{
            borderRadius: 10,
            background: 'rgba(27, 29, 44, 0.6)',
            padding: '5px 25px',
            marginTop: 18,
            width: '100%',
            fontSize: 25,
          }}
        >
          {(fingerPrint || []).map((emoji, index) => (
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
