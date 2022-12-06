import { FC, useState } from 'react';

import { TableBody, TableCell, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';

import styles from '../cardsTable.module.scss';

import editIcon from 'common/assets/icons/edit.png';
import deleteIcon from 'common/assets/icons/trash.svg';
import { selectCardsFromData, selectCardsStatus } from 'common/selectors';
import { dateFormat } from 'common/utils';
import { RatingStars } from 'components/rating-stars';
import {
  DeleteCardModal,
  EditCardModal,
  OpenModalDataType,
  QuestionType,
  SelectedCardType,
} from 'features/cards/cards-modals';
import { useAppDispatch } from 'store/hooks';
import { deleteCard } from 'store/reducers/cards-reducer';

type TableCardBodyType = {
  isOwner: boolean;
};

export const TableCardBody: FC<TableCardBodyType> = ({ isOwner }) => {
  const dispatch = useAppDispatch();
  const cards = useSelector(selectCardsFromData);
  const status = useSelector(selectCardsStatus);

  const [selectedCard, setSelectedCard] = useState<SelectedCardType>({
    cardId: '',
    packId: '',
    question: '',
    answer: '',
    questionImg: null,
    questionType: 'text',
  });

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const handleDeleteModalClick = (data: OpenModalDataType): void => {
    const questionType = data.questionImg !== 'url or base 64' ? 'image' : 'text';

    setSelectedCard({ ...data, questionType });
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

  const handleOpenEditModalClick = (data: OpenModalDataType): void => {
    const questionType = data.questionImg !== 'url or base 64' ? 'image' : 'text';

    setSelectedCard({ ...data, questionType });
    setIsOpenEditModal(true);
  };

  const handleQuestionTypeChange = (questionType: QuestionType): void => {
    setSelectedCard(data => ({ ...data, questionType }));
  };

  const handleQuestionChange = (question: string): void => {
    setSelectedCard(data => ({ ...data, question }));
  };

  const handleAnswerChange = (answer: string): void => {
    setSelectedCard(data => ({ ...data, answer }));
  };

  const handleQuestionImageChange = (questionImg: string): void => {
    setSelectedCard(data => ({ ...data, questionImg }));
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
            <TableCell align="right">{dateFormat(card.updated)}</TableCell>
            <TableCell align="right">
              <RatingStars stars={card.grade} />
            </TableCell>
            {isOwner && (
              <TableCell align="right" style={{ width: '60px' }}>
                <div className={styles.toolsIcon}>
                  <button
                    type="button"
                    onClick={() => {
                      handleOpenEditModalClick({
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
                      handleDeleteModalClick({
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
        selectedCard={selectedCard}
        isLoading={status === 'pending'}
        isOpen={isOpenEditModal}
        onQuestionTypeChangeHandler={handleQuestionTypeChange}
        onQuestionChangeHandler={handleQuestionChange}
        onQuestionImageChangeHandler={handleQuestionImageChange}
        onAnswerChangeHandler={handleAnswerChange}
        onCloseHandler={() => {
          setIsOpenEditModal(false);
        }}
      />
    </TableBody>
  );
};
