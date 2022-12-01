import { ChangeEvent, FC, useState } from 'react';

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import style from '../learningWindow.module.scss';

import { useAppDispatch } from 'store/hooks';
import { changeGradeCard } from 'store/reducers/learning-reducer';

type AnswerBlockType = {
  setAnswerBlock: (value: boolean) => void;
  cardId: string;
  answer: string;
  answerImg: string | null;
};

export const AnswerBlock: FC<AnswerBlockType> = ({
  setAnswerBlock,
  cardId,
  answer,
  answerImg,
}) => {
  const [rating, setRating] = useState('1');
  const dispatch = useAppDispatch();

  const nextButtonHandler = (): void => {
    setAnswerBlock(false);
    dispatch(changeGradeCard({ idCard: cardId, grade: Number(rating) }));
  };
  const setRatingHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setRating(e.target.value);
  };

  return (
    <div className={style.answerBlock}>
      <div className={style.question}>
        <span>Answer:</span>
        {answerImg && answerImg !== 'url or base 64' ? (
          <img src={answerImg} alt="0" className={style.questionImg} />
        ) : (
          answer
        )}
      </div>
      <div className={style.rateBlock}>
        <FormControl>
          <FormLabel id="controlled-radio-buttons-group">Rate yourself:</FormLabel>
          <RadioGroup
            aria-labelledby="controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={rating}
            onChange={setRatingHandler}
          >
            <FormControlLabel value="1" control={<Radio />} label="Did not know" />
            <FormControlLabel value="2" control={<Radio />} label="Forgot" />
            <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
            <FormControlLabel value="4" control={<Radio />} label="Confused" />
            <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
          </RadioGroup>
        </FormControl>
      </div>
      <Button variant="contained" className={style.button} onClick={nextButtonHandler}>
        Next
      </Button>
    </div>
  );
};
