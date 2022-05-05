import { Text } from '@components/base';
import { InputProps, TextInput } from '@mantine/core';

const AmountInput: React.FC<InputProps<any>> = (props) => {
  return (
    <TextInput
      radius={10}
      rightSection={<Text type="gradient">TUS</Text>}
      placeholder="0"
      size="md"
      {...props}
      type="number"
      styles={(theme) => ({
        input: {
          textAlign: 'right',
          padding: 12.5,
          paddingRight: 56,
          color: theme.fn.rgba('#fff', 0.35),
          '&::placeholder': {
            color: theme.fn.rgba('#fff', 0.35),
          },
        },
        rightSection: {
          right: 12.5,
        },
        ...props.styles,
      })}
    />
  );
};

export default AmountInput;
