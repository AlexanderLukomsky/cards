import { ChangeEvent, FC, useState } from 'react';

import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';

import style from './addNewCardModal.module.scss';
import { ImageInput } from './image-input';

import { BasicModal } from 'components/basic-modal';
import { useAppDispatch } from 'store/hooks';
import { addNewCard } from 'store/reducers/cards-reducer';

export const AddNewCardModal: FC<AddNewCardModalPropsType> = ({
  isOpen,
  onCloseHandler,
  isLoading,
  packId,
}) => {
  const dispatch = useAppDispatch();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [questionError, setQuestionError] = useState('');
  const [answerError, setAnswerError] = useState('');
  const [isImgQuestion, setIsImgQuestion] = useState<QuestionType>('text');
  const [questionImg, setQuestionImg] = useState('');

  const setTypeOfQuestionHandler = (event: SelectChangeEvent): void => {
    setIsImgQuestion(event.target.value as QuestionType);
  };

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>): void => {
    setQuestionError('');
    setQuestion(e.currentTarget.value);
  };
  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>): void => {
    setAnswerError('');
    setAnswer(e.currentTarget.value);
  };
  const onClose = (): void => {
    setQuestionError('');
    setAnswerError('');
    setAnswer('');
    setQuestion('');
    onCloseHandler();
    setQuestionImg('');
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
          cardsPack_id: packId,
          question,
          answer,
        };
        const action = await dispatch(addNewCard(card));

        if (action) {
          onClose();
        }
      }
    } else {
      if (!answer.trim()) {
        setAnswerError('enter answer');
      }
      if (questionImg.length > 1 && !!answer.trim()) {
        const card = {
          cardsPack_id: packId,
          questionImg,
          answer,
        };
        const action = await dispatch(addNewCard({ ...card, question: '123' }));

        if (action) {
          onClose();
        }
      }
    }
  };

  return (
    <BasicModal
      className={style.addCard}
      open={isOpen}
      title="Add card"
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
          labelId="ImgOrText"
          id="demo-simple-select-standard"
          value={isImgQuestion}
          onChange={setTypeOfQuestionHandler}
        >
          <MenuItem value="text">Text</MenuItem>
          <MenuItem value="image">Image</MenuItem>
        </Select>
      </FormControl>
      <div className={style.question}>
        {isImgQuestion === 'text' ? (
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
        ) : (
          <ImageInput image={questionImg} setImage={setQuestionImg} />
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
          label="Answer"
          variant="standard"
        />
        {!!answerError && <div className={style.answer__error}>{answerError}</div>}
      </div>
    </BasicModal>
  );
};
type AddNewCardModalPropsType = {
  isLoading: boolean;
  isOpen: boolean;
  onCloseHandler: () => void;
  packId: string;
};
export type QuestionType = 'text' | 'image';
