import { FC, useState } from 'react';

import { TableBody, TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from '../cardsTable.module.scss';

import editIcon from 'common/assets/icons/edit.png';
import deleteIcon from 'common/assets/icons/trash.svg';
import { selectCardsFromData, selectCardsStatus } from 'common/selectors';
import { dateFormat } from 'common/utils';
import { RatingStars } from 'components/rating-stars';
import { DeleteCardModal, EditCardModal } from 'features/cards/cards-modals';
import { useAppDispatch } from 'store/hooks';
import { deleteCard } from 'store/reducers/cards-reducer';

type TableCardBodyType = {
  isOwner: boolean;
};
type SelectedCardType = {
  cardId: string;
  packId: string;
  question: string;
  answer: string;
  questionImg: string | null;
};

export const TableCardBody: FC<TableCardBodyType> = ({ isOwner }) => {
  const dispatch = useAppDispatch();
  const cards = useSelector(selectCardsFromData);
  const status = useSelector(selectCardsStatus);
  // actions
  const [selectedCard, setSelectedCard] = useState<SelectedCardType>({
    cardId: '',
    packId: '',
    question: '',
    answer: '',
    questionImg: null,
  });
  // delete card
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const openDeleteModal = (data: SelectedCardType): void => {
    setSelectedCard(data);
    setIsOpenDeleteModal(true);
  };
  const deleteCardHandler = async (): Promise<void> => {
    const action = await dispatch(
      deleteCard({ cardId: selectedCard.cardId, packId: selectedCard.packId }),
    );

    if (action) {
      setIsOpenDeleteModal(false);
    }
  };
  // edit card
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const openEditModal = (data: SelectedCardType): void => {
    setSelectedCard(data);
    setIsOpenEditModal(true);
  };

  const onChangeQuestionHandler = (value: string): void => {
    setSelectedCard(data => ({ ...data, question: value }));
  };

  const onChangeAnswerHandler = (value: string): void => {
    setSelectedCard(data => ({ ...data, answer: value }));
  };

  return (
    <TableBody>
      {cards.length === 0 ? (
        <TableRow>
          <TableCell
            style={{
              paddingTop: '20px',
              height: '50px',
              display: 'flex',
              justifyContent: 'center',
              marginLeft: '400px',
            }}
          >
            no cards
          </TableCell>
        </TableRow>
      ) : (
        cards.map(card => (
          <TableRow
            key={card._id}
            sx={{
              '&:last-child td, &:last-child th': { border: 0 },
              backgroundColor: 'white',
            }}
          >
            <TableCell component="th" scope="row">
              {card.questionImg && card.questionImg !== 'url or base 64' ? (
                <img src={card.questionImg} alt="0" className={styles.questionImg} />
              ) : (
                card.question
              )}
            </TableCell>
            <TableCell align="right">
              {card.answerImg && card.answerImg !== 'url or base 64' ? (
                <img src={card.answerImg} alt="0" className={styles.questionImg} />
              ) : (
                card.answer
              )}
            </TableCell>
            <TableCell align="right">{dateFormat(new Date())}</TableCell>
            <TableCell align="right">
              <RatingStars stars={card.grade} />
            </TableCell>
            {isOwner && (
              <TableCell align="right" style={{ width: '60px' }}>
                <div className={styles.toolsIcon}>
                  <button
                    type="button"
                    onClick={() => {
                      openEditModal({
                        cardId: card._id,
                        packId: card.cardsPack_id,
                        question: card.question,
                        answer: card.answer,
                        questionImg: card.questionImg,
                      });
                    }}
                    disabled={status === 'pending'}
                    style={{ backgroundColor: 'white' }}
                  >
                    <img src={editIcon} alt="0" className={styles.Icon} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      openDeleteModal({
                        cardId: card._id,
                        packId: card.cardsPack_id,
                        question: card.question,
                        answer: card.answer,
                        questionImg: card.questionImg,
                      });
                    }}
                    disabled={status === 'pending'}
                    style={{ backgroundColor: 'white' }}
                  >
                    <img src={deleteIcon} alt="0" className={styles.Icon} />
                  </button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))
      )}
      <DeleteCardModal
        cardName={selectedCard.question}
        isOpen={isOpenDeleteModal}
        onClose={() => {
          setIsOpenDeleteModal(false);
        }}
        onDeleteCard={deleteCardHandler}
        isLoading={status === 'pending'}
      />
      <EditCardModal
        questionImg={selectedCard.questionImg}
        question={selectedCard.question}
        answer={selectedCard.answer}
        cardId={selectedCard.cardId}
        packId={selectedCard.packId}
        isLoading={status === 'pending'}
        isOpen={isOpenEditModal}
        onChangeQuestionHandler={onChangeQuestionHandler}
        onChangeAnswerHandler={onChangeAnswerHandler}
        onCloseHandler={() => {
          setIsOpenEditModal(false);
        }}
      />
    </TableBody>
  );
};
