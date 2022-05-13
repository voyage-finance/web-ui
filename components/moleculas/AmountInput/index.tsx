import { Button, Text } from '@components/base';
import { Group, InputProps, TextInput } from '@mantine/core';
import { useGetUserErc20Balance } from '../../../hooks';
import { GetInputProps } from '@mantine/form/lib/types';

type IProps = InputProps<any> &
  GetInputProps<'input'> & {
    symbol?: string;
    decimals?: number;
  };

const AmountInput: React.FC<IProps> = ({
  symbol = '',
  decimals = 18,
  onChange,
  ...props
}) => {
  const userBalance = useGetUserErc20Balance(symbol, decimals);
  const onClickMax = () => {
    onChange(userBalance);
  };

  return (
    <TextInput
      radius={10}
      rightSection={
        <Group direction="row" spacing={8}>
          <Button
            onClick={onClickMax}
            style={{
              height: 18,
              width: 40,
              padding: 0,
              borderRadius: 4,
            }}
          >
            MAX
          </Button>
          <Text type="gradient">{symbol}</Text>
        </Group>
      }
      placeholder="0"
      size="md"
      onChange={onChange}
      {...props}
      type="number"
      styles={(theme) => ({
        input: {
          textAlign: 'right',
          padding: 12.5,
          paddingRight: 90,
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
