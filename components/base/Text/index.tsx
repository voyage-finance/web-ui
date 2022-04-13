import { Text as MantineText, TextProps, useMantineTheme } from '@mantine/core';
import React from 'react';

type IProps = TextProps<any> & {
  type?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'accent'
    | 'danger'
    | 'success'
    | 'gradient';
};

const Text: React.FC<IProps> = ({ type, sx, ...props }) => {
  const { colors, other } = useMantineTheme();

  const color = (function () {
    switch (type) {
      case 'secondary':
        return colors.gray[1];
      case 'tertiary':
        return colors.gray[0];
      case 'accent':
        return colors.brand[6];
      case 'danger':
        return colors['accent-pink'][6];
      case 'success':
        return colors['accent-green'][6];
      default:
        return '#fff';
    }
  })();
  return (
    <MantineText
      variant={type === 'gradient' ? 'gradient' : undefined}
      gradient={type === 'gradient' ? other.gradients.brand : undefined}
      sx={{ color, ...sx }}
      {...props}
    />
  );
};

Text.defaultProps = {
  type: 'primary',
};

export default Text;
