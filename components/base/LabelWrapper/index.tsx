import { Group } from '@mantine/core';
import Text from '../Text';

const LabelWrapper: React.FC<{ label: string; required?: boolean }> = (
  props
) => {
  return (
    <Group direction="column" align="start" spacing={8}>
      <Group align={'end'} spacing={3}>
        <Text size="sm" type="secondary">
          {props.label} {props.required && '*'}
        </Text>
      </Group>
      {props.children}
    </Group>
  );
};

export default LabelWrapper;
