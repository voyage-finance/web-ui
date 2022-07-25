import { Group } from '@mantine/core';
import type { NextPage } from 'next';
import BoardingStateStep from './steps/BoardingStateStep';
import CheckEmailStep from './steps/CheckEmailStep';
import ConfirmStep from './steps/ConfirmStep';
import EnterEmailStep from './steps/EnterEmailStep';

const OnboardingPage: NextPage = () => {
  return (
    <Group direction="column">
      <EnterEmailStep />
      <BoardingStateStep />
      <CheckEmailStep />
      <ConfirmStep />
    </Group>
  );
};

export default OnboardingPage;
