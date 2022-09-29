import { Group } from '@mantine/core';
import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { MessageAction } from 'types';
import { sendExtensionMessage } from 'utils/extension';
import { decodeEmailNFingerprint } from 'utils/hash';
import ConfirmStep from './steps/ConfirmStep';
import SuccessStep from './steps/SuccessStep';
import WrongSessionStep from './steps/WrongSessionStep';

type IProps = {
  encoded: string;
  extension_id: string;
};

const OnboardingPage: NextPage<IProps> = ({ encoded, extension_id }) => {
  const [email, fingerPrint] = decodeEmailNFingerprint(encoded);
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onConfirmed = (sessionInfo: any) => {
    console.log('---- onConfirmed ----', sessionInfo);
    sendExtensionMessage(
      {
        action: MessageAction.AUTH_SUCCESS,
        params: { ...sessionInfo, email },
      },
      extension_id
    );
    setIsConfirmed(true);
  };

  useEffect(() => {
    const checkSessionFingerprint = () => {
      sendExtensionMessage(
        {
          action: MessageAction.GET_FINGERPRINT,
        },
        extension_id,
        (sessionFingerPrint: string) => {
          setIsSessionVerified(sessionFingerPrint == fingerPrint.join(''));
        }
      );
    };
    checkSessionFingerprint();
  }, []);

  return (
    <Group direction="column" align={'center'}>
      {isSessionVerified ? (
        !isConfirmed ? (
          <ConfirmStep
            email={email}
            fingerPrint={fingerPrint}
            onConfirmed={onConfirmed}
          />
        ) : (
          <SuccessStep />
        )
      ) : (
        <WrongSessionStep />
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
