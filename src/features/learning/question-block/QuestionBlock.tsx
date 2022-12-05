import { FC } from 'react';

import style from './questionBlock.module.scss';

import { Nullable } from 'common/types';

export const QuestionBlock: FC<QuestionBlockPropsType> = ({ image, question, shots }) => {
  const isImageQuestion = image && image !== 'url or base 64';

  return (
    <div className={style.question_block}>
      <span className={style.title}>Question:</span>

      {isImageQuestion ? (
        <div className={style.image_block}>
          <img src={image} alt="card img" className={style.image} />
        </div>
      ) : (
        <span className={style.text}>{question}</span>
      )}
      <div className={style.shots_block}>
        <span className={style.shots_title}>Number of attempts:</span>
        <span className={style.shots_text}>{shots}</span>
      </div>
    </div>
  );
};

type QuestionBlockPropsType = {
  image: Nullable<string>;
  question: string;
  shots: number;
};
