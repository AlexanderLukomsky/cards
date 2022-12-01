import { FC, useState } from 'react';

import style from './sortArrow.module.scss';

import arrow from 'common/assets/icons/arrow.png';
import { useAppDispatch } from 'store/hooks';
import { dataSort } from 'store/reducers/cards-reducer';

type SortArrowsPropsType = {
  packId: string;
  value: string;
};

export const SortArrows: FC<SortArrowsPropsType> = ({ packId, value }) => {
  const dispatch = useAppDispatch();
  const [up, setUp] = useState(true);

  const sortUpDataHandler = (): void => {
    dispatch(dataSort({ packId, direction: 0, value }));
    setUp(!up);
  };

  const sortDownDataHandler = (): void => {
    dispatch(dataSort({ packId, direction: 1, value }));
    setUp(!up);
  };

  return (
    <span className={style.block}>
      {up ? (
        <button type="button" onClick={sortUpDataHandler}>
          <img src={arrow} alt="0" className={style.buttonUp} />
        </button>
      ) : (
        <button type="button" onClick={sortDownDataHandler}>
          <img src={arrow} alt="0" className={style.buttonDown} />
        </button>
      )}
    </span>
  );
};
