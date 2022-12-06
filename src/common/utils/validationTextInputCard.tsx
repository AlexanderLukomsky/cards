export const validationTextInputCard = (params: ParamsType): ErrorValuesType => {
  const { question, answer } = params;
  const values = {
    questionError: '',
    answer: '',
    isError: false,
  };

  if (question !== undefined) {
    if (!question.trim()) {
      values.questionError = 'question is required';
      values.isError = true;
    }
  }
  if (answer !== undefined) {
    if (!answer.trim()) {
      values.answer = 'answer is required';
      values.isError = true;
    }
  }

  return values;
};
type ParamsType = {
  question?: string;
  answer?: string;
};

type ErrorValuesType = {
  questionError: string;
  answer: string;
  isError: boolean;
};
