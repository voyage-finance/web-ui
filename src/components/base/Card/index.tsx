import { Card as MantineCard, CardProps } from '@mantine/core';
import { PolymorphicComponentProps } from '@mantine/utils';
import React from 'react';

type Props = PolymorphicComponentProps<'div', CardProps>;

const Card: React.FC<Props> = ({ sx, ...props }) => {
  return (
    <MantineCard
      withBorder
      radius={10}
      sx={{
        boxSizing: 'border-box',
        background: 'rgba(27, 29, 44, 0.6)',
        // borderImageSource:
        //   'linear-gradient(180deg, #575B79 0%, rgba(27, 29, 44, 0) 100%)',
        ...sx,
      }}
      {...props}
    />
  );
};

export default Card;
