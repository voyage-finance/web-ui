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
};

const OnboardingPage: NextPage<IProps> = ({ encoded }) => {
  const [email, fingerPrint] = decodeEmailNFingerprint(encoded);
  const [isSessionVerified, setIsSessionVerified] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const onConfirmed = (sessionInfo: any) => {
    console.log('---- onConfirmed ----', sessionInfo);
    sendExtensionMessage({
      action: MessageAction.AUTH_SUCCESS,
      params: { ...sessionInfo, email },
    });
    setIsConfirmed(true);
  };

  useEffect(() => {
    const checkSessionFingerprint = () => {
      sendExtensionMessage(
        {
          action: MessageAction.GET_FINGERPRINT,
        },
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
  const { encoded } = context.query;
  return {
    props: {
      encoded,
    },
  };
};

export default OnboardingPage;
