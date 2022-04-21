import {
  Button as MaintineButton,
  useMantineTheme,
  ButtonProps,
} from '@mantine/core';
import React from 'react';

type BaseProps = Pick<
  ButtonProps<'button'>,
  Exclude<keyof ButtonProps<'button'>, 'size'>
>;

interface IProps extends BaseProps {
  size?: 'regular' | 's' | 'xl' | 'l';
  kind?: 'primary' | 'secondary' | 'cancel';
}

const Button: React.FC<IProps> = ({ kind, children, size, ...rest }) => {
  const { other } = useMantineTheme();

  const variant = kind === 'primary' ? 'gradient' : 'outline';
  const gradient = kind === 'primary' ? other.gradients.brand : undefined;
  const height = (function () {
    switch (size) {
      case 'regular':
        return 40;
      case 's':
        return 24;
      case 'l':
        return 48;
      case 'xl':
        return 64;
    }
  })();
  const fontSize = (function () {
    switch (size) {
      case 'regular':
        return 12;
      case 's':
        return 10;
      case 'l':
        return 16;
      case 'xl':
        return 18;
    }
  })();

  return (
    <MaintineButton
      variant={rest.disabled ? 'filled' : variant}
      gradient={gradient}
      style={{
        height,
        fontSize,
        color: rest.disabled
          ? '#6F7073'
          : kind === 'cancel'
          ? 'white'
          : undefined,
        // [TODO] define by common theme color
        borderColor: kind === 'cancel' ? '#444546' : undefined,
        borderRadius: size === 'regular' ? '10px' : '4px',
        background: rest.disabled ? '#444546' : undefined,
      }}
      sx={{
        // remove dark overlayer for loading state
        '&::before': {
          display: 'none',
        },
      }}
      loaderPosition="right"
      radius="md"
      {...rest}
    >
      {children}
    </MaintineButton>
  );
};

Button.defaultProps = {
  size: 'regular',
  kind: 'primary',
};

export default Button;
