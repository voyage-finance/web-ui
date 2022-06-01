import { Text } from '@components/base';
import { BoxProps, Group, Center } from '@mantine/core';
import { useIsMounted } from 'utils/hooks';
import { useAccount } from 'wagmi';
import ConnectBtn from '../WalletNavItem/ConnectBtn';

const WalletConnectionFence: React.FC<BoxProps<'div'>> = ({
  children,
  ...props
}) => {
  const isMounted = useIsMounted();
  const { data } = useAccount();
  if (data && isMounted) return <>{children}</>;
  else
    return (
      <Center {...props}>
        <Group direction="column" align="center">
          <Text>Connect your wallet to view.</Text>
          <ConnectBtn />
        </Group>
      </Center>
    );
};

export default WalletConnectionFence;
