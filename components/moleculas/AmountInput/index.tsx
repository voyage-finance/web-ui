import { Text } from '@components/base';
import { InputProps, TextInput } from '@mantine/core';

type IProps = InputProps<any> & {
  symbol?: string;
};

const AmountInput: React.FC<IProps> = ({ symbol, ...props }) => {
  return (
    <TextInput
      radius={10}
      rightSection={<Text type="gradient">{symbol}</Text>}
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
