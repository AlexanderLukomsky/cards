import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import style from './backLinkButton.module.scss';

import backIcon from 'common/assets/icons/back.png';

export const BackLinkButton: FC<BackLinkButtonPropsType> = ({ path }) => {
  return (
    <NavLink to={path} className={style.back_link}>
      <img src={backIcon} alt="back" />
      <span>Back to Packs list</span>
    </NavLink>
  );
};
type BackLinkButtonPropsType = {
  path: string;
};
