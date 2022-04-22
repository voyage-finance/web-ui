import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  createStyles,
  Group,
  Header,
  UnstyledButton,
} from '@mantine/core';
import WalletNavItem from '@components/moleculas/WalletNavItem';
import Divider from '@components/base/Divider';
import { NavLink } from '@components/base';

const HEADER_HEIGHT = 48;

const useStyles = createStyles((theme, _, getRef) => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 50,
  },
}));

const Navigation: React.FC = () => {
  const { classes } = useStyles();
  return (
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
  );
};

export default Navigation;
