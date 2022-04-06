import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  createStyles,
  Group,
  Header,
  UnstyledButton,
  Divider,
} from '@mantine/core';
import ConnectWallet from './ConnectWallet';

const HEADER_HEIGHT = 48;

const useStyles = createStyles((theme, _, getRef) => ({
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 50,
  },
  button: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: theme.fontSizes.lg,
    lineHeight: '20px',
    fontWeight: 700,
    color: 'white',
    borderWidth: 0,
    [`&:hover .${getRef('border')}`]: {
      width: '100%',
    },
    ['&:not(:last-child)']: {
      marginRight: 40,
    },
  },
  border: {
    ref: getRef('border'),
    height: 2,
    width: 0,
    background: theme.fn.linearGradient(
      180,
      theme.other.gradients.brand.from,
      theme.other.gradients.brand.to
    ),
    transition: 'width 0.1s linear',
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
          <UnstyledButton component={Link} href="/lend">
            <div className={classes.button}>
              <div>Lend</div>
              <div className={classes.border} />
            </div>
          </UnstyledButton>
          <UnstyledButton component={Link} href="/borrow">
            <div className={classes.button}>
              <div>Borrow</div>
              <div className={classes.border} />
            </div>
          </UnstyledButton>
          <UnstyledButton component={Link} href="/sponsor">
            <div className={classes.button}>
              <div>Sponsor</div>
              <div className={classes.border} />
            </div>
          </UnstyledButton>
        </Group>
        <Divider
          sx={{
            marginLeft: 'auto',
            borderLeftColor: 'rgba(255, 255, 255, 0.08)',
          }}
          size="sm"
          orientation="vertical"
        />
        <Group sx={{ height: '100%' }}>
          <ConnectWallet />
        </Group>
      </Group>
    </Header>
  );
};

export default Navigation;
