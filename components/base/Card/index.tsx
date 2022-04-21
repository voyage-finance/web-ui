import { Card as MantineCard, CardProps, useMantineTheme } from '@mantine/core';
import React from 'react';

const Card: React.FC<CardProps<'div'>> = ({ style, ...props }) => {
  return (
    <MantineCard
      withBorder
      radius={10}
      style={{ borderColor: '#575B79', ...style }}
      {...props}
    />
  );
};

export default Card;
