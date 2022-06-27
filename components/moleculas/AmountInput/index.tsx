import { Button, Text } from '@components/base';
import { Group, InputProps, TextInput } from '@mantine/core';
import { useGetUserErc20Balance } from '../../../hooks';
import { GetInputProps } from '@mantine/form/lib/types';
import { BigNumber } from 'bignumber.js';

type IProps<C = 'input'> = InputProps<C> &
  GetInputProps<'input'> & {
    symbol?: string;
    decimals?: number;
    maximum?: BigNumber;
    showMaxBtn?: boolean;
  };

const AmountInput: React.FC<IProps> = ({
  symbol = '',
  decimals = 18,
  onChange,
  maximum,
  showMaxBtn = true,
  ...props
}) => {
  const userBalance = useGetUserErc20Balance(symbol, decimals);
  const maxAmount = maximum ? maximum : userBalance;

  const onClickMax = () => {
    onChange(maxAmount);
  };

  return (
    <TextInput
      radius={10}
      rightSection={
        <Group
          direction="row"
          spacing={12}
          position="right"
          style={{ width: '100%' }}
        >
          {showMaxBtn && (
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
          )}
          <Text type="gradient" weight="bold">
            {symbol}
          </Text>
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
          paddingRight: showMaxBtn ? 96 : 46,
          color: theme.fn.rgba('#fff', 0.35),
          '&::placeholder': {
            color: theme.fn.rgba('#fff', 0.35),
          },
        },
        rightSection: {
          right: 12.5,
          width: 78,
        },
        ...props.styles,
      })}
    />
  );
};

export default AmountInput;
