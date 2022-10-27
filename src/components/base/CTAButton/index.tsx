import { Text, useMantineTheme, TextProps } from '@mantine/core';
import { PolymorphicComponentProps } from '@mantine/utils';
import styles from './index.module.scss';
import React from 'react';

interface IProps extends PolymorphicComponentProps<'div', TextProps> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const CTAButton: React.FC<IProps> = ({
  icon,
  iconPosition,
  children,
  ...rest
}) => {
  const { other } = useMantineTheme();

  return (
    <div className={styles.CTAButton}>
      {icon && iconPosition === 'left' ? icon : null}
      <div className={styles.text}>
        <Text
          variant="gradient"
          size="lg"
          gradient={other.gradients.brand}
          weight={700}
          {...rest}
        >
          {children}
        </Text>
      </div>
      {icon && iconPosition === 'right' ? icon : null}
    </div>
  );
};

CTAButton.defaultProps = {
  iconPosition: 'left',
};

export default CTAButton;
