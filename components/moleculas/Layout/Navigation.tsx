import WalletNavItem from '@components/moleculas/WalletNavItem';
import { Box, createStyles, Group, Header } from '@mantine/core';
import { useIsWrongNetwork } from 'hooks';
import Image from 'next/image';
import { useIsMounted } from 'utils/hooks';
import WrongNetworkBanner from './WrongNetworkBanner';

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
          flex: '1 0 auto',
          padding: '0 16px',
          backgroundColor: theme.colors.dark[6],
          border: 'none',
        })}
      >
        <Group sx={{ height: '100%', justifyContent: 'space-between' }}>
          <Box className={classes.logo}>
            <Image
              src="/logo-voyage-light.svg"
              alt="Voyage logo"
              height={25}
              width={80}
              style={{ marginRight: 50 }}
            />
          </Box>
          <Box className={classes.wallet}>
            <WalletNavItem />
          </Box>
        </Group>
      </Header>
    </>
  );
};

export default Navigation;
