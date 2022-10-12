import { Group } from '@mantine/core';
import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { MessageAction } from 'types';
import { sendExtensionMessage } from 'utils/extension';
import { decodeEmailNFingerprint } from 'utils/hash';
import ConfirmStep from './steps/ConfirmStep';
import SuccessStep from './steps/SuccessStep';
import RetryStep from './steps/RetryStep';
import Head from 'next/head';
import WrongBrowserStep from './steps/WrongBrowserStep';

type IProps = {
  encoded: string;
  extension_id: string;
};

enum ErrorType {
  WRONG_BROWSER,
  WRONG_FINGERPRINT,
  MESSAGE_FAIL,
}

const OnboardingPage: NextPage<IProps> = ({ encoded, extension_id }) => {
  const [error, setError] = useState<ErrorType>();
  const [email, fingerPrint] = decodeEmailNFingerprint(encoded);
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onConfirmed = (sessionInfo: any) => {
    console.log('---- onConfirmed ----', sessionInfo);
    try {
      sendExtensionMessage(
        {
          action: MessageAction.AUTH_SUCCESS,
          params: { ...sessionInfo, email },
        },
        extension_id
      );
    } catch (e: any) {
      console.error('[sendExtensionMessage]', e);
      setError(ErrorType.MESSAGE_FAIL);
    }
    setIsConfirmed(true);
  };

  const checkSessionFingerprint = () => {
    try {
      sendExtensionMessage(
        {
          action: MessageAction.GET_FINGERPRINT,
        },
        extension_id,
        (sessionFingerPrint: string) => {
          if (!chrome.runtime.lastError) {
            const isFIngerprintValid =
              sessionFingerPrint == fingerPrint.join('');
            setIsSessionVerified(isFIngerprintValid);
          } else {
            console.error(
              "couldn't send message",
              chrome.runtime.lastError.message
            );
            setError(ErrorType.WRONG_FINGERPRINT);
          }
        }
      );
    } catch (e: any) {
      console.error('[checkSessionFingerprint]', e);
      setError(ErrorType.WRONG_BROWSER);
    }
  };

  useEffect(() => {
    checkSessionFingerprint();
  }, []);

  return (
    <Group direction="column" align={'center'}>
      <Head>
        <title>Voyage Confirmation</title>
      </Head>
      {error == undefined &&
        isSessionVerified &&
        (!isConfirmed ? (
          <ConfirmStep
            email={email}
            fingerPrint={fingerPrint}
            onConfirmed={onConfirmed}
          />
        ) : (
          <SuccessStep />
        ))}
      {error == undefined && !isSessionVerified && (
        <RetryStep extension_id={extension_id} />
      )}
      {error == ErrorType.WRONG_BROWSER && <WrongBrowserStep />}
      {(error == ErrorType.WRONG_FINGERPRINT ||
        error == ErrorType.MESSAGE_FAIL) && (
        <RetryStep extension_id={extension_id} />
      )}
    </Group>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { encoded, extension_id } = context.query;
  return {
    props: {
      encoded,
      extension_id,
    },
  };
};

export default OnboardingPage;
