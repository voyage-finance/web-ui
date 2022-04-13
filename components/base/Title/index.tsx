import { Title as MantineTitle, TitleProps } from '@mantine/core';
import React from 'react';

const Title: React.FC<TitleProps> = (props) => {
  return <MantineTitle {...props} style={{ color: 'white', ...props.style }} />;
};

export default Title;
