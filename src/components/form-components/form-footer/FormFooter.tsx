import { FC, ReactNode } from 'react';

import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const FormFooter: FC<FormFooterPropsType> = ({
  buttonTitle,
  onClick,
  linkTitle,
  pathTo,
  children,
  className,
  disabled,
}) => {
  return (
    <div className={`${className ? `${className} ` : ''}form-footer`}>
      {buttonTitle && onClick && (
        <Button
          disabled={disabled}
          variant="contained"
          className="form-footer__button"
          onClick={onClick}
        >
          {buttonTitle}
        </Button>
      )}
      {children && <span className="form-footer__text">{children}</span>}
      {pathTo && linkTitle && (
        <NavLink className="form-footer__link" to={pathTo}>
          {linkTitle}
        </NavLink>
      )}
    </div>
  );
};
type FormFooterPropsType = {
  buttonTitle?: string;
  onClick?: () => void;
  linkTitle?: string;
  pathTo?: string;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
};
