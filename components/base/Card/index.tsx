import { Card as MantineCard, CardProps } from '@mantine/core';
import React from 'react';

const Card: React.FC<CardProps<'div'>> = ({ style, ...props }) => {
  return (
    <MantineCard
      withBorder
      radius={10}
      style={{
        border: '1px solid',
        background: 'rgba(27, 29, 44, 0.6)',
        borderImageSource:
          'linear-gradient(180deg, #575B79 0%, rgba(27, 29, 44, 0) 100%)',
        ...style,
      }}
      {...props}
    />
  );
};

export default Card;
