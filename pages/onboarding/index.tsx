import { Group } from '@mantine/core';
import type { NextPage } from 'next';
import Boarding from './stages/Boarding';
import EnterEmailStep from './stages/EnterEmail';

const OnboardingPage: NextPage = () => {
  return (
    <Group direction="column">
      <EnterEmailStep />
      <Boarding />
    </Group>
  );
};

export default OnboardingPage;
