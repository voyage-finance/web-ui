/*global chrome*/
import { Group } from '@mantine/core';
import type { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { decodeEmailNFingerprint } from 'utils/hash';
import ConfirmStep from './steps/ConfirmStep';
import SuccessStep from './steps/SuccessStep';

type IProps = {
  encoded: string;
};

const OnboardingPage: NextPage<IProps> = ({ encoded }) => {
  const [email, fingerPrint] = decodeEmailNFingerprint(encoded);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const onConfirmed = (jwt: string) => {
    console.log('---- onConfirmed ----', jwt);
    chrome.runtime.sendMessage('ajhbpbfgomfnocldchjlagpcbhlkoohc', {
      action: 'auth_success',
      jwt: jwt,
      email,
    });
    setIsConfirmed(true);
  };

  return (
    <Group direction="column" align={'center'}>
      {!isConfirmed ? (
        <ConfirmStep
          email={email}
          fingerPrint={fingerPrint}
          onConfirmed={onConfirmed}
        />
      ) : (
        <SuccessStep />
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
