import { FC } from 'react';

export const FormTitle: FC<FormTitlePropsType> = ({ title }) => (
  <h3 className="form__title">{title}</h3>
);
type FormTitlePropsType = {
  title: string;
};
