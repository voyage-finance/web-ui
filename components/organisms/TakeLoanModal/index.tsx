import { Modal } from '@components/base';
import { ModalProps } from '@mantine/core';
import EnterAmountStep from './Steps/EnterAmountStep';
import { VaultData } from 'types';
import { ReserveAssets, RESERVE_NAME_MAP } from 'consts';

type IProps = ModalProps & {
  vault: VaultData;
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
      title={`Take Loan | ${
        RESERVE_NAME_MAP[vault.symbol.toLowerCase() as ReserveAssets]
      }`}
      centered
      onClose={onClose}
      {...props}
    >
      <EnterAmountStep onSuccess={onBorrowed} vault={vault} />
    </Modal>
  );
};

export default TakeLoanModal;
