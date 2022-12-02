import { FC } from 'react';
import './formTitle.scss';

export const FormTitle: FC<FormTitlePropsType> = ({ title }) => (
  <h3 className="form-title">{title}</h3>
);
type FormTitlePropsType = {
  title: string;
};
