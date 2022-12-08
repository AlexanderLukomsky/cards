/* eslint-disable no-magic-numbers */
import { useEffect, useState } from 'react';

import { Button, Switch } from '@mui/material';
import { useSelector } from 'react-redux';

import { AnswerBlock } from '../answer-block';
import { QuestionBlock } from '../question-block';

import style from './learningWindow.module.scss';

import {
  selectIsOrderedSort,
  selectLearningCard,
  selectLearningPackName,
} from 'common/selectors';
import { useAppDispatch } from 'store/hooks';
import { CardType } from 'store/reducers/cards-reducer';
import { setIsOrderedSort } from 'store/reducers/learning-reducer';

const getRandomCard = (cards: CardType[]): CardType => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
  const rand = Math.random() * sum;
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);

      return { sum: newSum, id: newSum < rand ? i : acc.id };
    },
    { sum: 0, id: -1 },
  );

  return cards[res.id + 1];
};

export const LearningWindow = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const packName = useSelector(selectLearningPackName);
  const isOrderedSort = useSelector(selectIsOrderedSort);
  const cards = useSelector(selectLearningCard);

  const [selectedCard, setSelectedCard] = useState<CardType>({} as CardType);

  const [isShowedAnswerBlock, setIsShowedAnswerBlock] = useState(false);

  const handleShowAnswerBlockClick = (): void => {
    setIsShowedAnswerBlock(true);
  };
  const handleCloseAnswerBlockClick = (): void => {
    setIsShowedAnswerBlock(false);
  };

  const handleCardOrderChange = (): void => {
    dispatch(setIsOrderedSort(!isOrderedSort));
  };

  useEffect(() => {
    if (!isOrderedSort) {
      setSelectedCard(getRandomCard(cards));
    } else {
      let index = cards.findIndex(card => card._id === selectedCard._id);

      if (index === cards.length - 1) {
        index = -1;
      }
      setSelectedCard(cards[index + 1]);
    }
  }, [dispatch, cards, isOrderedSort, selectedCard._id]);

  return (
    <div className={style.learn_wrapper}>
      <h3 className={style.title}>Learn ${packName}</h3>

      <div className={style.switch_block}>
        <span className={style.switch_block__text}>random mode</span>
        <Switch checked={!isOrderedSort} onChange={handleCardOrderChange} />
      </div>

      <div className={style.learn_block}>
        <QuestionBlock
          image={selectedCard.questionImg}
          question={selectedCard.question}
          shots={selectedCard.shots}
        />

        {isShowedAnswerBlock ? (
          <AnswerBlock
            onNextButtonClickHandler={handleCloseAnswerBlockClick}
            cardId={selectedCard._id}
            answer={selectedCard.answer}
            image={selectedCard.answerImg}
          />
        ) : (
          <Button
            variant="contained"
            className={style.button}
            onClick={handleShowAnswerBlockClick}
          >
            Show answer
          </Button>
        )}
      </div>
    </div>
  );
};
