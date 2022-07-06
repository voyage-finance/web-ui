import { Modal } from '@components/base';
import { ModalProps } from '@mantine/core';
import EnterAmountStep from './Steps/EnterAmountStep';
import { VaultData } from 'types';

type IProps = ModalProps & {
  vault?: VaultData;
  onUpdate: () => void;
};

const TakeLoanModal: React.FC<IProps> = ({
  onClose,
  onUpdate,
  vault,
  ...props
}) => {
  const onBorrowed = () => {
    onUpdate();
    onClose();
  };

  return (
    <Modal
      title={`Take Loan | Crypto Unicorns`}
      centered
      onClose={onClose}
      {...props}
    >
      <EnterAmountStep onSuccess={onBorrowed} vault={vault} />
    </Modal>
  );
};

export default TakeLoanModal;
