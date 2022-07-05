import { Modal } from '@components/base';
import { LoadingOverlay, ModalProps } from '@mantine/core';
import EnterAmountStep from './Steps/EnterAmountStep';
import { usePoolDataCtx, useUserDataCtx } from 'hooks/context/usePoolDataCtx';
import { VaultData } from 'types';

type IProps = ModalProps & {
  vault?: VaultData;
};

const TakeLoanModal: React.FC<IProps> = ({ onClose, vault, ...props }) => {
  const [, isPoolDataLoading, refetchPool] = usePoolDataCtx();
  const [, isUserDataLoading, refetchUserData] = useUserDataCtx();

  const onBorrowed = () => {
    refetchPool();
    refetchUserData();
    onClose();
  };

  return (
    <Modal
      title={`Take Loan | Crypto Unicorns`}
      centered
      onClose={onClose}
      {...props}
    >
      <LoadingOverlay visible={isUserDataLoading || isPoolDataLoading} />
      <EnterAmountStep onSuccess={onBorrowed} vault={vault} />
    </Modal>
  );
};

export default TakeLoanModal;
