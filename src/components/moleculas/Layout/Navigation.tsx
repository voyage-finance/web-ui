import WalletNavItem from '@components/moleculas/WalletNavItem';
import { Box, createStyles, Group, Stack, Header } from '@mantine/core';
import { useIsWrongNetwork } from 'hooks';
import Image from 'next/image';
import { useIsMounted } from '@utils/hooks';
import WrongNetworkBanner from './WrongNetworkBanner';
import Link from 'next/link';
import React from 'react';

const HEADER_HEIGHT = 48;

const useStyles = createStyles(() => ({
  logo: {
    display: 'flex',
    flex: '1 0 auto',
    alignItems: 'center',
    marginRight: 50,
  },
  wallet: {
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
  },
}));

const Logo = React.forwardRef(() => {
  return (
    <Image
      src="/logo-voyage-light.svg"
      alt="Voyage logo"
      height={25}
      width={80}
      style={{ marginRight: 50, cursor: 'pointer' }}
    />
  );
});

Logo.displayName = 'Logo';

const Navigation: React.FC = () => {
  const { classes } = useStyles();
  const [isWrongNetwork] = useIsWrongNetwork();
  const isMounted = useIsMounted();
  const showWrongNetworkBanner = isWrongNetwork && isMounted;
  return (
    <Stack>
      {isWrongNetwork && isMounted && <WrongNetworkBanner />}
      <Header
        height={HEADER_HEIGHT}
        sx={(theme) => ({
          flex: '1 0 auto',
          backgroundColor: theme.colors.dark[6],
          border: 'none',
          top: showWrongNetworkBanner ? HEADER_HEIGHT : 0,
        })}
      >
        <Group
          sx={{
            height: '100%',
            justifyContent: 'space-between',
            padding: '0 16px',
          }}
        >
          <Box className={classes.logo}>
            <Link href="/">
              <Logo />
            </Link>
          </Box>
          <Box className={classes.wallet}>
            <WalletNavItem />
          </Box>
        </Group>
      </Header>
    </Stack>
  );
};

export default Navigation;
