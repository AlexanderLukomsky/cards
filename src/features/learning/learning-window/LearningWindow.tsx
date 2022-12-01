/* eslint-disable no-magic-numbers */
import { useEffect, useState } from 'react';

import { Button, Switch } from '@mui/material';
import { useSelector } from 'react-redux';

import { AnswerBlock } from './answer-block';
import style from './learningWindow.module.scss';

import {
  selectLearningCard,
  selectLearningPackName,
  selectLearningStepBy,
} from 'common/selectors';
import { useAppDispatch } from 'store/hooks';
import { CardType } from 'store/reducers/cards-reducer';
import { setFilter } from 'store/reducers/learning-reducer';

const getCard = (cards: CardType[]): CardType => {
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
  const sortStepByStep = useSelector(selectLearningStepBy);
  const cardAll = useSelector(selectLearningCard);

  const [card, setCard] = useState<CardType>({
    _id: 'fake',
    cardsPack_id: '',
    answer: 'answer fake',
    question: 'question fake',
    questionImg: null,
    answerImg: null,
    grade: 0,
    shots: 0,
    type: '',
    rating: 0,
    more_id: '',
    created: '',
    updated: '',
    __v: 0,
    user_id: '',
    questionVideo: '',
    comments: '',
    answerVideo: '',
  });

  const [answerBlock, setAnswerBlock] = useState(false);

  const answerButtonHandler = (): void => {
    setAnswerBlock(true);
  };

  const [checked, setChecked] = useState(sortStepByStep);
  const handleChange = (): void => {
    dispatch(setFilter({ filter: !checked }));
    setChecked(!checked);
  };

  useEffect(() => {
    if (!sortStepByStep) {
      let index = cardAll.findIndex(c => c._id === card._id);

      if (index === cardAll.length - 1) {
        index = -1;
      }
      setCard(cardAll[index + 1]);
    } else {
      setCard(getCard(cardAll));
    }
  }, [dispatch, packName, cardAll, card._id, sortStepByStep]);

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h3>Learn {packName} </h3>
        <div className={style.switch}>
          <span className={style.mode}>dogged mode</span>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
      </div>
      <div className={style.block}>
        <div className={style.question}>
          <span>Question: </span>
          {card.questionImg && card.questionImg !== 'url or base 64' ? (
            <img src={card.questionImg} alt="0" className={style.questionImg} />
          ) : (
            card.question
          )}
        </div>
        <div className={style.attempts}>
          Number of attempts:
          <span>{card.shots}</span>
        </div>
        {!answerBlock ? (
          <Button
            variant="contained"
            className={style.button}
            onClick={answerButtonHandler}
          >
            Show answer
          </Button>
        ) : (
          <AnswerBlock
            setAnswerBlock={setAnswerBlock}
            cardId={card._id}
            answer={card.answer}
            answerImg={card.answerImg}
          />
        )}
      </div>
    </div>
  );
};
