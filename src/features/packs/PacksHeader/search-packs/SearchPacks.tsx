import { useState, ChangeEvent, useEffect, useCallback } from 'react';

import { useSelector } from 'react-redux';

import style from './searchPacks.module.scss';

import { ReactComponent as SearchIcon } from 'common/assets/icons/searchIcon.svg';
import { selectSearchPacksName } from 'common/selectors';
import { useAppDispatch } from 'store/hooks';
import { packsActions } from 'store/reducers/packs-reducer';

export const SearchPacks = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setSearchPacksName } = packsActions;
  const searchPacksName = useSelector(selectSearchPacksName);

  const [value, setValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const search = useCallback(
    (value: string) => {
      if (!value.trim()) {
        dispatch(setSearchPacksName(null));
        setValue('');
        setIsSearching(false);
      } else {
        dispatch(setSearchPacksName(value.trim()));
        setIsSearching(false);
      }
    },
    [dispatch, setSearchPacksName],
  );

  useEffect(() => {
    if (!isSearching) return;
    const id = setTimeout(() => {
      search(value);
      // eslint-disable-next-line no-magic-numbers
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, [value, isSearching, search]);

  useEffect(() => {
    setValue(searchPacksName || '');
  }, [searchPacksName]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    setValue(value);
    setIsSearching(true);
  };

  return (
    <div className={style.search}>
      <div className={style.search__title}>Search</div>
      <div className={style.search__container}>
        <SearchIcon className={style.search__icon} />
        <input
          className={style.search__value}
          type="text"
          value={value}
          onChange={onChangeHandler}
          placeholder="Provide your text"
        />
      </div>
    </div>
  );
};
