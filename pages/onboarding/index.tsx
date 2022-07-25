import { Group } from '@mantine/core';
import type { NextPage } from 'next';
import BoardingStateStep from './stages/BoardingStateStep';
import CheckEmailStep from './stages/CheckEmailStep';
import EnterEmailStep from './stages/EnterEmailStep';

const OnboardingPage: NextPage = () => {
  return (
    <Group direction="column">
      <EnterEmailStep />
      <BoardingStateStep />
      <CheckEmailStep />
    </Group>
  );
};

export default OnboardingPage;
