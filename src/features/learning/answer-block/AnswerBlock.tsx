import { ChangeEvent, FC, useState } from 'react';

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';

import style from './answerBlock.module.scss';

import { Nullable } from 'common/types';
import { useAppDispatch } from 'store/hooks';
import { setCardGrade } from 'store/reducers/learning-reducer';

export const AnswerBlock: FC<AnswerBlockPropsType> = ({
  onNextButtonClickHandler,
  cardId,
  answer,
  image,
}) => {
  const isImageAnswer = image && image !== 'url or base 64';

  const [grade, setGrade] = useState('1');
  const dispatch = useAppDispatch();

  const handleNextButtonClick = (): void => {
    onNextButtonClickHandler();
    dispatch(setCardGrade({ card_id: cardId, grade: +grade }));
  };
  const handleGradeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setGrade(e.target.value);
  };

  return (
    <div className={style.answer_block}>
      <span className={style.title}>Answer:</span>
      {isImageAnswer ? (
        <div className={style.image_block}>
          <img src={image} alt="card img" className={style.image} />
        </div>
      ) : (
        <span className={style.text}>{answer}</span>
      )}
      <div className={style.rate_block}>
        <FormControl>
          <FormLabel>Rate yourself:</FormLabel>

          <RadioGroup value={grade} onChange={handleGradeChange}>
            <FormControlLabel value="1" control={<Radio />} label="Did not know" />
            <FormControlLabel value="2" control={<Radio />} label="Forgot" />
            <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
            <FormControlLabel value="4" control={<Radio />} label="Confused" />
            <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
          </RadioGroup>
        </FormControl>
      </div>
      <Button
        variant="contained"
        className={style.button}
        onClick={handleNextButtonClick}
      >
        Next
      </Button>
    </div>
  );
};
type AnswerBlockPropsType = {
  onNextButtonClickHandler: () => void;
  cardId: string;
  answer: string;
  image: Nullable<string>;
};
