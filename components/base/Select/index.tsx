import * as React from 'react';
import { Select as MantineSelect, SelectProps } from '@mantine/core';
import LabelWrapper from '../LabelWrapper';
import { ChevronDown } from 'tabler-icons-react';

type ISelectProps = SelectProps & {
  label?: string;
};

const Select: React.FunctionComponent<ISelectProps> = ({
  label,
  width,
  ...props
}) => {
  const element = (
    <MantineSelect
      {...props}
      size="md"
      radius={10}
      rightSection={<ChevronDown size={24} />}
      styles={(theme) => ({
        input: {
          padding: 12.5,
          color: theme.fn.rgba('#fff', 0.35),
          '&::placeholder': {
            color: theme.fn.rgba('#fff', 0.35),
          },
          width,
        },
        dropdown: {
          background: 'rgb(27, 29, 44)',
          boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.64)',
        },
        item: {
          color: 'rgba(255, 255, 255, 0.35)',
          '&:hover': {
            background: theme.fn.rgba('#fff', 0.1),
          },
        },
        selected: {
          background: 'unset',
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

export default Select;
