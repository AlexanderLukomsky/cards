import { FC, useState } from 'react';

import {
  CardModalImageQuestion,
  SelectQuestionType,
  TextInput,
} from '../modal-components';

import style from './addNewCardModal.module.scss';

import { Nullable } from 'common/types';
import { validationTextInputCard } from 'common/utils';
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

  const [questionError, setQuestionError] = useState<Nullable<string>>(null);
  const [answerError, setAnswerError] = useState<Nullable<string>>(null);

  const [questionImage, setQuestionImage] = useState<Nullable<string>>(null);
  const [questionImageError, setQuestionImageError] = useState<Nullable<string>>(null);

  const [questionType, setQuestionType] = useState<QuestionType>('text');

  const handleQuestionTypeChange = (value: QuestionType): void => {
    setQuestionType(value);

    if (questionType === 'text') {
      setQuestionError(null);

      return;
    }
    setQuestionImageError(null);
  };

  const handleQuestionValueChange = (value: string): void => {
    setQuestionError('');
    setQuestion(value);
  };

  const handleAnswerValueChange = (value: string): void => {
    setAnswerError('');
    setAnswer(value);
  };

  const handleSuccessUploadImage = (value: string): void => {
    setQuestionImageError(null);
    setQuestionImage(value);
  };

  const handlerErrorUploadImage = (value: string): void => {
    setQuestionImageError(value);
  };

  const handleCloseModal = (): void => {
    setAnswer('');
    setQuestion('');
    setQuestionError(null);
    setAnswerError(null);
    setQuestionImage(null);
    setQuestionImageError(null);
    setQuestionType('text');
    onCloseHandler();
  };

  const handleSaveCardButtonClick = async (): Promise<void> => {
    const errors = validationTextInputCard({ question, answer });

    if (questionType === 'text') {
      if (errors.isError) {
        setQuestionError(errors.questionError);
        setAnswerError(errors.answer);

        return;
      }
      const card = {
        cardsPack_id: packId,
        question,
        answer,
      };
      const action = await dispatch(addNewCard(card));

      if (addNewCard.fulfilled.match(action)) {
        handleCloseModal();
      }

      return;
    }

    if (errors.isError || questionImageError || !questionImage) {
      setAnswerError(errors.answer);
      setQuestionImageError('image is required');

      return;
    }

    const card = {
      cardsPack_id: packId,
      questionImage,
      answer,
    };
    const action = await dispatch(addNewCard(card));

    if (addNewCard.fulfilled.match(action)) {
      handleCloseModal();
    }
  };

  return (
    <BasicModal
      className={style.addCard}
      open={isOpen}
      title="Add card"
      onClose={handleCloseModal}
      cancelButton={{
        title: 'Cancel',
        buttonProps: { onClick: handleCloseModal, disabled: isLoading },
      }}
      confirmButton={{
        title: 'Save',
        buttonProps: {
          onClick: handleSaveCardButtonClick,
          disabled: isLoading || !!questionError || !!answerError,
        },
      }}
      isLoading={isLoading}
    >
      <SelectQuestionType
        onChangeHandler={handleQuestionTypeChange}
        questionType={questionType}
      />

      <div className={style.question}>
        {questionType === 'text' ? (
          <TextInput
            onChangeHandler={handleQuestionValueChange}
            value={question}
            errorMessage={questionError}
            label="Question"
          />
        ) : (
          <CardModalImageQuestion
            image={questionImage}
            errorMessage={questionImageError}
            onSuccessUploadImageHandler={handleSuccessUploadImage}
            onErrorUploadImageHandler={handlerErrorUploadImage}
          />
        )}
      </div>

      <div className={style.answer}>
        <TextInput
          onChangeHandler={handleAnswerValueChange}
          value={answer}
          errorMessage={answerError}
          label="Answer"
        />
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
