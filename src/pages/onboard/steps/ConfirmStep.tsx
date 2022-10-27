import * as React from 'react';
import { Card, Text, Button } from '@components/base';
import { Box, Group, Stack } from '@mantine/core';
import Image from 'next/image';
import SwordImg from 'assets/sword.png';
import auth0 from 'auth0-js';

const ConfirmStep: React.FC<{
  email: string;
  fingerPrint: string[];
  onConfirmed: (sessionInfo: any) => void;
  extension_id: string;
}> = ({ fingerPrint, onConfirmed, extension_id }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const onConfirm = async () => {
    try {
      const state = fingerPrint.join('');
      const webAuth = new auth0.WebAuth({
        domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
        clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
        responseType: 'token id_token',
        state,
      });
      setIsLoading(true);
      const sessionInfo = await new Promise((resolve, reject) => {
        webAuth.parseHash({ hash: window.location.hash, state }, (err, res) => {
          if (err) {
            console.error(err);
            return reject(err);
          }

          if (!res) {
            return reject(new Error('Unable to parse id token hash.'));
          }

          if (!res.accessToken) {
            return reject(new Error('No access token found.'));
          }

          webAuth.client.userInfo(res.accessToken, (err, user) => {
            if (err) {
              return reject(err);
            }

            if (!res.idToken) {
              return reject(new Error('No id token found.'));
            }

            resolve({
              jwt: res.idToken,
              accessToken: res.accessToken,
              uid: user.sub,
            });
          });
        });
      });
      onConfirmed(sessionInfo);
    } catch (err: any) {
      console.error('[confirm click]', err);
      setError(
        err.message ||
          err.errorDescription ||
          'We were unable to verify your session.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onTryClicked = () => {
    window.location.href = `chrome-extension://${extension_id}/reset.html`;
  };

  return !error ? (
    <Card
      style={{
        width: 420,
        margin: 'auto',
        padding: '53px 62px',
        paddingBottom: '40px',
      }}
    >
      <Stack align={'center'} spacing={0}>
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
      </Stack>
    </Card>
  ) : (
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
        <Text mt={16} align="center" type="danger">
          {error}
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

export default ConfirmStep;
