import { FC, useState } from 'react';

import {
  CardModalImageQuestion,
  QuestionType,
  SelectedCardType,
  SelectQuestionType,
  TextInput,
} from '../modal-components';

import style from './editCardModal.module.scss';

import { Nullable } from 'common/types';
import { validationTextInputCard } from 'common/utils';
import { BasicModal } from 'components/basic-modal';
import { useAppDispatch } from 'store/hooks';
import { editCard } from 'store/reducers/cards-reducer';

export const EditCardModal: FC<EditCardModalPropsType> = ({
  isOpen,
  isLoading,
  selectedCard,
  onCloseHandler,
  onQuestionChangeHandler,
  onAnswerChangeHandler,
  onQuestionTypeChangeHandler,
  onQuestionImageChangeHandler,
}) => {
  const dispatch = useAppDispatch();

  const { questionImg, question, answer, packId, cardId, questionType } = selectedCard;

  const [questionError, setQuestionError] = useState<Nullable<string>>(null);

  const [answerError, setAnswerError] = useState<Nullable<string>>(null);

  const [questionImageError, setQuestionImageError] = useState<Nullable<string>>(null);

  const handleQuestionTypeChange = (value: QuestionType): void => {
    onQuestionTypeChangeHandler(value);

    if (value === 'image') {
      setQuestionError(null);

      return;
    }
    setQuestionImageError(null);
  };

  const handleCloseModal = (): void => {
    onCloseHandler();
    setQuestionError(null);
    setAnswerError(null);
    setQuestionImageError(null);
  };

  const handleSaveCardButtonClick = async (): Promise<void> => {
    if (questionType === 'text') {
      const errors = validationTextInputCard({ question, answer });

      if (errors.isError) {
        setQuestionError(errors.questionError);
        setAnswerError(errors.answer);

        return;
      }
      const data = {
        card: {
          _id: cardId,
          question,
          answer,
          questionImg: 'url or base 64',
        },
        packId,
      };
      const action = await dispatch(editCard(data));

      if (editCard.fulfilled.match(action)) {
        handleCloseModal();
      }

      return;
    }

    const errors = validationTextInputCard({ answer });

    if (errors.isError) {
      setAnswerError(errors.answer);

      return;
    }
    if (questionImageError || !questionImg) {
      setQuestionImageError('image is required');

      return;
    }
    const data = {
      card: {
        _id: cardId,
        question: null,
        answer,
        questionImg,
      },
      packId,
    };
    const action = await dispatch(editCard(data));

    if (editCard.fulfilled.match(action)) {
      handleCloseModal();
    }
  };

  const handleQuestionValueChange = (value: string): void => {
    setQuestionError('');
    onQuestionChangeHandler(value);
  };

  const handleAnswerValueChange = (value: string): void => {
    setAnswerError('');
    onAnswerChangeHandler(value);
  };
  const handleSuccessUploadImage = (value: string): void => {
    setQuestionImageError(null);
    onQuestionImageChangeHandler(value);
  };
  const handlerErrorUploadImage = (value: string): void => {
    setQuestionImageError(value);
  };

  return (
    <BasicModal
      className={style.editCard}
      open={isOpen}
      title="Edit card"
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
            image={questionImg}
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

type EditCardModalPropsType = {
  isLoading: boolean;
  isOpen: boolean;
  onQuestionChangeHandler: (value: string) => void;
  onAnswerChangeHandler: (value: string) => void;
  onCloseHandler: () => void;
  onQuestionTypeChangeHandler: (value: QuestionType) => void;
  onQuestionImageChangeHandler: (value: string) => void;
  selectedCard: SelectedCardType;
};
