import { Group, InputProps, TextInput } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';
import { AlertCircle, CircleCheck } from 'tabler-icons-react';
import Text from '../Text';

type IProps<C = 'input'> = InputProps<C> &
  GetInputProps<'input'> & {
    label?: string;
  };

const Input: React.FC<IProps> = ({ label, width, required, ...props }) => {
  const element = (
    <TextInput
      radius={10}
      placeholder="0"
      size="md"
      {...props}
      rightSection={
        props.error ? (
          <AlertCircle size={24} color="#F4501B" />
        ) : (
          props.value && <CircleCheck size={24} color="#0CCDAA" />
        )
      }
      styles={(theme) => ({
        input: {
          padding: 12.5,
          color: theme.fn.rgba('#fff', 0.35),
          '&::placeholder': {
            color: theme.fn.rgba('#fff', 0.35),
          },
          width,
        },
        disabled: {
          color: 'rgba(255, 255, 255, 0.35) !important',
        },
        rightSection: {
          right: 12.5,
        },
        ...props.styles,
      })}
    />
  );
  return label ? (
    <LabelWrapper label={label} required={required}>
      {element}
    </LabelWrapper>
  ) : (
    element
  );
};

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

export default Input;
