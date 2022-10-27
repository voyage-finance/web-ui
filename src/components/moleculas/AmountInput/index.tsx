import { Button, Text } from '@components/base';
import { Group, TextInput, TextInputProps } from '@mantine/core';
import { normalize } from '@utils/bn';
import { BigNumber } from 'bignumber.js';
import { ethers } from 'ethers';
import { ChangeEventHandler } from 'react';
import { useGetUserErc20Balance } from '../../../hooks';

type IProps = Omit<TextInputProps, 'onChange'> & {
  onChange: (value: string) => void;
  address: string;
  symbol: string;
  decimals?: number;
  maximum?: BigNumber;
  showMaxBtn?: boolean;
};

const AmountInput: React.FC<IProps> = ({
  address,
  symbol = 'WETH',
  decimals = 18,
  onChange,
  maximum,
  showMaxBtn = true,
  ...props
}) => {
  const { data: userBalance = ethers.constants.Zero } =
    useGetUserErc20Balance(address);
  const maxAmount = maximum ? maximum : userBalance;
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange(event.currentTarget.value);
  };
  const handleClickMax = () => {
    onChange(normalize(maxAmount.toString(), decimals));
  };

  return (
    <TextInput
      radius={10}
      rightSection={
        <Group spacing={12} position="right" style={{ width: '100%' }}>
          {showMaxBtn && (
            <Button
              onClick={handleClickMax}
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
      rightSectionWidth={80}
      placeholder="0"
      size="md"
      onChange={handleChange}
      {...props}
      type="number"
      styles={(theme) => ({
        input: {
          textAlign: 'right',
          padding: 12.5,
          paddingRight: showMaxBtn ? 110 : 46,
          color: theme.fn.rgba('#fff', 0.35),
          '&::placeholder': {
            color: theme.fn.rgba('#fff', 0.35),
          },
        },
        rightSection: {
          right: 12.5,
          width: showMaxBtn ? 95 : 26,
        },
        disabled: {
          color: 'rgba(255, 255, 255, 0.35) !important',
        },
        ...props.styles,
      })}
    />
  );
};

export default AmountInput;
