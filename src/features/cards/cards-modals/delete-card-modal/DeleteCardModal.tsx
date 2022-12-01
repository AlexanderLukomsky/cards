import { FC } from 'react';

import style from './deleteCardModal.module.scss';

import { BasicModal } from 'components/basic-modal';

export const DeleteCardModal: FC<DeleteCardsModalPropsType> = ({
  cardName,
  isOpen,
  onClose,
  onDeleteCard,
  isLoading,
}) => {
  return (
    <BasicModal
      className={style.deleteCard}
      open={isOpen}
      title="Delete Card"
      onClose={onClose}
      cancelButton={{
        title: 'Cancel',
        buttonProps: { onClick: onClose, disabled: isLoading },
      }}
      confirmButton={{
        title: 'Delete',
        buttonProps: { onClick: onDeleteCard, disabled: isLoading },
      }}
      isLoading={isLoading}
    >
      <div className={style.text}>
        Do you really want to remove <span className={style.card_name}>{cardName}?</span>
        <div>All cards will be deleted.</div>
      </div>
    </BasicModal>
  );
};
type DeleteCardsModalPropsType = {
  cardName: string;
  isOpen: boolean;
  onClose: () => void;
  onDeleteCard: () => void;
  isLoading: boolean;
};
