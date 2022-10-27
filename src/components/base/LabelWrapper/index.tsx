import { Group, Stack } from '@mantine/core';
import Text from '../Text';

const LabelWrapper: React.FC<{ label: string; required?: boolean }> = (
  props
) => {
  return (
    <Stack align="start" spacing={8}>
      <Group align={'end'} spacing={3}>
        <Text size="sm" type="secondary">
          {props.label} {props.required && '*'}
        </Text>
      </Group>
      {props.children}
    </Stack>
  );
};

export default LabelWrapper;
