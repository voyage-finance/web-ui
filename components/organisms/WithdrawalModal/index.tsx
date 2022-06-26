import { Modal } from '@components/base';
import { LoadingOverlay, ModalProps } from '@mantine/core';
import EnterAmountStep from './Steps/EnterAmountStep';
import { TrancheTextMap, TrancheType } from 'types';
import { showNotification } from 'utils/notification';
import { usePoolDataCtx, useUserDataCtx } from 'hooks/context/usePoolDataCtx';

type IProps = ModalProps & {
  type: TrancheType;
};

const WithdrawalModal: React.FC<IProps> = ({
  type,
  onClose: _onClose,
  ...props
}) => {
  const [, isPoolDataLoading, refetchPool] = usePoolDataCtx();
  const [, isUserDataLoading, refetchUserData] = useUserDataCtx();

  const onWithdrawn = () => {
    refetchPool();
    refetchUserData();
    showNotification({
      title: 'Withdrawal success',
      message: `Your withdrawal was successfull`,
      type: 'success',
    });
    _onClose();
  };

  const onClose = () => {
    _onClose();
  };

  return (
    <Modal
      title={`Withdraw from ${TrancheTextMap[type]} Tranche`}
      centered
      onClose={onClose}
      {...props}
    >
      <LoadingOverlay visible={isUserDataLoading || isPoolDataLoading} />
      <EnterAmountStep type={type} onSuccess={onWithdrawn} />
    </Modal>
  );
};

export default WithdrawalModal;
