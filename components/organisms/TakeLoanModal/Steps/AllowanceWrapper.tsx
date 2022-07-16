import { Button, Text } from '@components/base';
import { useAllowanceApproved } from 'hooks';
import { Box } from '@mantine/core';
import { useEffect } from 'react';

type IProps = {
  vaultAddress?: string;
};

const AllowanceWrapper: React.FC<IProps> = ({ vaultAddress, children }) => {
  const [isApproved, isApproving, isLoading, onApprove] = useAllowanceApproved(
    vaultAddress || '',
    'You can now start borrowing'
  );

  const onApproveClicked = () => {
    console.log('[AllowanceWrapper] onApproveClicked');
    onApprove();
  };

  useEffect(() => {
    console.log('[AllowanceWrapper] vaultAddress', vaultAddress);
  }, []);

  return isApproved ? (
    <Box sx={{ position: 'relative' }}>{children}</Box>
  ) : (
    <>
      <Text>Approve your vault before borrowing loan</Text>
      <Button
        fullWidth
        mt={16}
        loading={isLoading || isApproving}
        onClick={onApproveClicked}
        disabled={isLoading || isApproving}
      >
        Approve
      </Button>
    </>
  );
};

export default AllowanceWrapper;
