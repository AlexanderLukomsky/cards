import { useState, useEffect } from 'react';

import Slider from '@mui/material/Slider';
import { useSelector } from 'react-redux';

import style from './packsCountFilter.module.scss';

import './thumb.scss';
import { selectMaxCardsCount, selectMinCardsCount } from 'common/selectors';
import { useAppDispatch } from 'store/hooks';
import { packsActions } from 'store/reducers/packs-reducer';

export const PacksCountFilter = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { setFilterValues } = packsActions;
  const minCardsCount = useSelector(selectMinCardsCount);
  const maxCardsCount = useSelector(selectMaxCardsCount);

  const [values, setValues] = useState({ min: minCardsCount, max: maxCardsCount });

  useEffect(() => {
    setValues({ min: minCardsCount, max: maxCardsCount });
  }, [minCardsCount, maxCardsCount]);

  const handleFilterChange = (event: Event, value: number | number[]): void => {
    const valuesAsArr = value as number[];

    if (valuesAsArr[1] < 1) return;
    setValues({ min: valuesAsArr[0], max: valuesAsArr[1] });
  };

  const handleFilterChangeCommitted = (): void => {
    dispatch(setFilterValues(values));
  };

  return (
    <div className={`${style.filter} packs-filter`}>
      <div className={style.filter__title}>Number of cards</div>
      <div className={style.filter__row}>
        <div className={style.filter__display_value}>{values.min}</div>
        <Slider
          value={[minCardsCount === maxCardsCount ? 0 : values.min, values.max]}
          onChange={handleFilterChange}
          min={minCardsCount === maxCardsCount ? 0 : minCardsCount}
          max={maxCardsCount}
          onChangeCommitted={handleFilterChangeCommitted}
          disabled={minCardsCount === maxCardsCount}
        />

        <div className={style.filter__display_value}>{values.max}</div>
      </div>
    </div>
  );
};
