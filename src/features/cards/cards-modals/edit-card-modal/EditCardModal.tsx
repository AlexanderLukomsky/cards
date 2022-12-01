import { ChangeEvent, FC, useEffect, useState } from 'react';

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import { QuestionType } from '../add-new-card-modal';
import { ImageInput } from '../add-new-card-modal/image-input';

import style from './editCardModal.module.scss';

import { BasicModal } from 'components/basic-modal';
import { useAppDispatch } from 'store/hooks';
import { editCard } from 'store/reducers/cards-reducer';

export const EditCardModal: FC<EditCardModalPropsType> = ({
  isOpen,
  onCloseHandler,
  isLoading,
  question,
  answer,
  onChangeQuestionHandler,
  onChangeAnswerHandler,
  cardId,
  packId,
  questionImg,
}) => {
  const dispatch = useAppDispatch();

  const [questionError, setQuestionError] = useState('');
  const [answerError, setAnswerError] = useState('');

  const [isImgQuestion, setIsImgQuestion] = useState<QuestionType>('text');
  const [imageForQuestion, setImageForQuestion] = useState(questionImg);

  useEffect(() => {
    setIsImgQuestion(questionImg && questionImg !== 'url or base 64' ? 'image' : 'text');
    setImageForQuestion(questionImg);
  }, [questionImg]);

  const setTypeOfQuestionHandler = (event: SelectChangeEvent): void => {
    setIsImgQuestion(event.target.value as QuestionType);
  };

  const onClose = (): void => {
    onCloseHandler();
    setQuestionError('');
    setAnswerError('');
    setImageForQuestion('url or base 64');
  };
  const setEditedCard = async (): Promise<void> => {
    if (isImgQuestion === 'text') {
      if (!question.trim()) {
        setQuestionError('enter a question');
      }
      if (!answer.trim()) {
        setAnswerError('enter answer');
      }
      if (!!question.trim() && !!answer.trim()) {
        const card = {
          _id: cardId,
          question,
          answer,
          questionImg: 'url or base 64',
        };
        const action = await dispatch(editCard({ card, packId }));

        if (action) {
          onCloseHandler();
        }
      }
    } else {
      if (!answer.trim()) {
        setAnswerError('enter answer');
      }
      if (imageForQuestion && !!answer.trim()) {
        const card = {
          _id: cardId,
          questionImg: imageForQuestion,
          answer,
        };
        const action = await dispatch(editCard({ card, packId }));

        if (action) {
          onCloseHandler();
        }
      }
    }
  };

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuestionError('');
    onChangeQuestionHandler(e.currentTarget.value);
  };
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>): void => {
    setAnswerError('');
    onChangeAnswerHandler(e.currentTarget.value);
  };

  return (
    <BasicModal
      className={style.editCard}
      open={isOpen}
      title="Edit card"
      onClose={onClose}
      cancelButton={{
        title: 'Cancel',
        buttonProps: { onClick: onClose, disabled: isLoading },
      }}
      confirmButton={{
        title: 'Save',
        buttonProps: {
          onClick: setEditedCard,
          disabled: isLoading || !!questionError || !!answerError,
        },
      }}
      isLoading={isLoading}
    >
      <FormControl variant="outlined" className={style.selector}>
        <Select
          labelId="ImgOrTextEdit"
          id="editSelector"
          value={isImgQuestion}
          onChange={setTypeOfQuestionHandler}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="image">Image</MenuItem>
        </Select>
      </FormControl>
      <div className={style.question}>
        {isImgQuestion === 'image' ? (
          <ImageInput image={imageForQuestion} setImage={setImageForQuestion} />
        ) : (
          <TextField
            className={style.question__value}
            error={!!questionError}
            color={questionError ? 'error' : 'info'}
            value={question}
            onChange={onChangeQuestion}
            id="outlined-basic"
            label="Question"
            variant="standard"
          />
        )}

        {!!questionError && <div className={style.question__error}>{questionError}</div>}
      </div>
      <div className={style.answer}>
        <TextField
          className={style.answer__value}
          error={!!answerError}
          color={answerError ? 'error' : 'info'}
          value={answer}
          onChange={onChangeAnswer}
          id="outlined-basic"
          label="Name pack"
          variant="standard"
        />
        {!!answerError && <div className={style.answer__error}>{answerError}</div>}
      </div>
    </BasicModal>
  );
};

type EditCardModalPropsType = {
  isLoading: boolean;
  isOpen: boolean;
  onCloseHandler: () => void;
  question: string;
  answer: string;
  onChangeQuestionHandler: (value: string) => void;
  onChangeAnswerHandler: (value: string) => void;
  cardId: string;
  packId: string;
  questionImg: string | null;
};
