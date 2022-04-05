import { MantineProvider } from '@mantine/core';
import React from 'react';

const Layout: React.FC = (props) => {
  const { children } = props;
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          brand: [
            '#FFFBF8',
            '#FFE2C9',
            '#FFCA9E',
            '#FFB578',
            '#FFA254',
            '#FF9034',
            '#FF811D',
            '#FF7000',
            '#EC6500',
            '#D45B00',
          ],
          'accent-green': [
            '#7EFFEA',
            '#5AFFE4',
            '#3AFFDF',
            '#1FFFD9',
            '#0AFDD1',
            '#08E7BE',
            '#0CCDAA',
            '#06BD9C',
            '#02AE8F',
            '#00A183',
          ],
          'accent-pink': [
            '#FFE0EC',
            '#FFB4D0',
            '#FF8BB6',
            '#FF669F',
            '#FF498B',
            '#FA307A',
            '#F41B6A',
            '#EE065A',
            '#DC0050',
            '#CA0047',
          ],
          'accent-blue': [
            '#FEFEFF',
            '#CEE5FF',
            '#A3CEFF',
            '#7CBAFF',
            '#59A7FF',
            '#3D96FF',
            '#1884FF',
            '#0075FF',
            '#0069EC',
            '#005FD5',
          ],
        },
        primaryColor: 'brand',
        fontFamily: 'Titillium Web, sans-serif',
        headings: { fontFamily: 'Titillium Web, sans-serif' },
        other: {
          gradients: {
            brand: { from: '#ffa620', to: '#ef5b25', deg: 90 },
          },
        },
      }}
    >
      {children}
    </MantineProvider>
  );
};

export default Layout;
