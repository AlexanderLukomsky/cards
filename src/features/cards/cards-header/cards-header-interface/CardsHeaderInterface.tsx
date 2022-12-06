import { FC, useState } from 'react';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './cardsHeaderInterface.module.scss';

import {
  selectCardsPackName,
  selectCardsStatus,
  selectCardsTotalCount,
} from 'common/selectors';
import { appPath } from 'components/routes/path';
import { BurgerMenu } from 'features/cards/burger-menu';
import { AddNewCardModal } from 'features/cards/cards-modals';

export const CardsHeaderInterface: FC<CardsHeaderInterfacePropsType> = ({
  isOwner,
  packId,
}) => {
  const navigate = useNavigate();

  const cardsTotalCount = useSelector(selectCardsTotalCount);
  const status = useSelector(selectCardsStatus);
  const packName = useSelector(selectCardsPackName);

  const [isOpenNewCardModal, setIsOpenNewCardModal] = useState(false);

  const handleLearnButtonClick = (): void => {
    navigate(appPath.LEARNING_DEFAULT + packId);
  };

  return isOwner ? (
    <div className={style.interface}>
      <div className={style.title_block}>
        <span className={style.title}>{packName}</span>
        <span className={style.title__description}>My Pack</span>
        <BurgerMenu isLoading={status === 'pending'} _id={packId} />
      </div>
      <div>
        <Button
          variant="contained"
          className={style.button}
          onClick={() => {
            setIsOpenNewCardModal(true);
          }}
          disabled={status === 'pending'}
        >
          Add New Card
        </Button>
        <AddNewCardModal
          isLoading={status === 'pending'}
          isOpen={isOpenNewCardModal}
          onCloseHandler={() => {
            setIsOpenNewCardModal(false);
          }}
          packId={packId}
        />
      </div>
    </div>
  ) : (
    <div className={style.interface}>
      <div className={style.title_block}>
        <span className={style.title}>{packName}</span>
        <span className={style.title__description}>Friend`&apos;s Pack</span>
      </div>
      <Button
        variant="contained"
        className={style.button}
        onClick={handleLearnButtonClick}
        disabled={status === 'pending' || cardsTotalCount === 0}
      >
        Learn to pack
      </Button>
    </div>
  );
};

type CardsHeaderInterfacePropsType = {
  isOwner: boolean;
  packId: string;
};
