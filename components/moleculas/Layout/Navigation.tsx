import Image from 'next/image';
import { Box, createStyles, Group, Header } from '@mantine/core';
import WalletNavItem from '@components/moleculas/WalletNavItem';
import Divider from '@components/base/Divider';
import { NavLink } from '@components/base';
import { useIsWrongNetwork } from 'hooks';
import WrongNetworkBanner from './WrongNetworkBanner';
import { useIsMounted } from 'utils/hooks';

const HEADER_HEIGHT = 48;

const useStyles = createStyles(() => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 50,
  },
}));

const Navigation: React.FC = () => {
  const { classes } = useStyles();
  const [isWrongNetwork] = useIsWrongNetwork();
  const isMounted = useIsMounted();
  return (
    <>
      {isWrongNetwork && isMounted && <WrongNetworkBanner />}
      <Header
        height={HEADER_HEIGHT}
        sx={(theme) => ({
          padding: '0 16px',
          backgroundColor: theme.colors.dark[6],
          border: 'none',
        })}
      >
        <Group sx={{ height: '100%' }}>
          <Box className={classes.logo}>
            <Image
              src="/logo-voyage-light.svg"
              alt="Voyage logo"
              height={25}
              width={80}
              style={{ marginRight: 50 }}
            />
          </Box>
          <Group sx={{ height: '100%' }}>
            <NavLink href="/" exact>
              Lend
            </NavLink>
            <NavLink href="/borrow" exact>
              Borrow
            </NavLink>
            <NavLink href="/sponsor" exact>
              Sponsor
            </NavLink>
          </Group>
          <Divider
            sx={{
              marginLeft: 'auto',
            }}
            size="sm"
            orientation="vertical"
          />
          <Group sx={{ height: '100%' }}>
            <WalletNavItem />
          </Group>
        </Group>
      </Header>
    </>
  );
};

export default Navigation;
