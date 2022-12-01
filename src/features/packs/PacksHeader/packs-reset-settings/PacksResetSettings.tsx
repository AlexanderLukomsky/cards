import { FC } from 'react';

import style from './packsResetSettings.module.scss';

import { ReactComponent as FilterRemove } from 'common/assets/icons/filterRemove.svg';

export const PacksResetSettings: FC<PacksResetSettingsPropsType> = ({ onClick }) => (
  <button type="button" className={style.reset} onClick={onClick}>
    <FilterRemove className={style.reset__icon} />
  </button>
);
type PacksResetSettingsPropsType = {
  onClick: () => void;
};
