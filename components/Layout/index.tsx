import { MantineProvider } from '@mantine/core';
import React from 'react';

const Layout: React.FC = (props) => {
  const { children } = props;
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: 'Titillium Web, sans-serif',
        headings: { fontFamily: 'Titillium Web, sans-serif' },
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default Layout;
