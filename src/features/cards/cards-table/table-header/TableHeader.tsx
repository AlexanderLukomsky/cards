/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-undef */
import { FC, useState } from 'react';

import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../cardsTable.module.scss';

import coverDefault from 'common/assets/images/coverDefault.jpg';
import {
  selectCardsPackDeckCover,
  selectCardsPackName,
  selectCardsStatus,
  selectCardsTotalCount,
} from 'common/selectors';
import { appPath } from 'components/routes/path';
import { BurgerMenu } from 'features/cards/burger-menu';
import { AddNewCardModal } from 'features/cards/cards-modals';

type HeaderTableType = {
  isOwner: boolean;
  packId: string;
};

export const TableHeader: FC<HeaderTableType> = ({ isOwner, packId }) => {
  const navigate = useNavigate();
  const status = useSelector(selectCardsStatus);
  const packName = useSelector(selectCardsPackName);
  const cardsTotalCount = useSelector(selectCardsTotalCount);
  const packCover = useSelector(selectCardsPackDeckCover);

  const [isOpenNewCardModal, setIsOpenNewCardModal] = useState(false);
  const learnCardHandler = (): void => {
    navigate(appPath.LEARNING_DEFAULT + packId);
  };

  return (
    <>
      {isOwner ? (
        <div>
          <div className={styles.headerBlock}>
            <div className={styles.title}>
              <span>{packName}</span>
              <span className={styles.owner}>My Pack</span>
              <span>
                <BurgerMenu status={status === 'pending'} _id={packId} />
              </span>
            </div>
            <Button
              variant="contained"
              className={styles.button}
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
          <img
            src={packCover && packCover !== 'url or base64' ? packCover : coverDefault}
            alt="0"
            className={styles.packCover}
          />
        </div>
      ) : (
        <div>
          <div className={styles.headerBlock}>
            <div className={styles.title}>
              <span>{packName}</span>
              <span className={styles.owner}> Friend`&apos;s Pack</span>
            </div>
            <Button
              variant="contained"
              className={styles.button}
              onClick={learnCardHandler}
              disabled={status === 'pending' || cardsTotalCount === 0}
            >
              Learn to pack
            </Button>
          </div>
          <img
            src={packCover && packCover !== 'url or base64' ? packCover : coverDefault}
            alt="0"
            className={styles.packCover}
          />
        </div>
      )}
    </>
  );
};
