import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import style from './user.module.scss';

import { validationImage } from 'common/utils';

export const User: FC<UserPropsType> = ({
  name,
  avatar,
  userId,
  publicCardPacksCount,
}) => {
  return (
    <div className={style.user}>
      <img className={style.avatar} src={validationImage(avatar)} alt="avatar" />

      {publicCardPacksCount === 0 ? (
        <span className={style.name}>{name}</span>
      ) : (
        <NavLink className={style.name} to={userId}>
          {name}
        </NavLink>
      )}
    </div>
  );
};

type UserPropsType = {
  name: string;
  avatar: string;
  userId: string;
  publicCardPacksCount: number;
};
