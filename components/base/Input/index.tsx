import { TextInputProps, TextInput } from '@mantine/core';
import { GetInputProps } from '@mantine/form/lib/types';
import { AlertCircle, CircleCheck } from 'tabler-icons-react';
import LabelWrapper from '../LabelWrapper';

type IProps = TextInputProps &
  GetInputProps<'input'> & {
    label?: string;
  };

const Input: React.FC<IProps> = ({ label, width, ...props }) => {
  const element = (
    <TextInput
      radius={10}
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
    <LabelWrapper label={label} required={props.required}>
      {element}
    </LabelWrapper>
  ) : (
    element
  );
};

export default Input;
