import { Modal } from '@components/base';
import { ModalProps } from '@mantine/core';
import EnterAmountStep from './Steps/EnterAmountStep';
import { CreditLine } from 'types';

type IProps = ModalProps & {
  creditLine: CreditLine;
  onUpdate: () => void;
};

const TakeLoanModal: React.FC<IProps> = ({
  onClose,
  onUpdate,
  creditLine,
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
      <EnterAmountStep onSuccess={onBorrowed} creditLine={creditLine} />
    </Modal>
  );
};

export default TakeLoanModal;
