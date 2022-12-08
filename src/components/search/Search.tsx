import { useState, ChangeEvent, useEffect, useCallback, FC } from 'react';

import style from './search.module.scss';

import { ReactComponent as SearchIcon } from 'common/assets/icons/searchIcon.svg';
import { Nullable } from 'common/types';

export const Search: FC<SearchPropsType> = ({
  initialValue,
  onSetSearchHandler,
  className,
}) => {
  const [value, setValue] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const timeOutInterval = 1000;

  const search = useCallback(
    (value: string) => {
      if (!value.trim()) {
        onSetSearchHandler(null);
        setValue('');
        setIsSearching(false);
      } else {
        onSetSearchHandler(value.trim());
        setIsSearching(false);
      }
    },
    [onSetSearchHandler],
  );

  useEffect(() => {
    if (!isSearching) return;
    const id = setTimeout(() => {
      search(value);
    }, timeOutInterval);

    return () => {
      clearTimeout(id);
    };
  }, [value, isSearching, search]);

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;

    setValue(value);
    setIsSearching(true);
  };

  return (
    <div className={`${style.search} ${className}`}>
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

type SearchPropsType = {
  initialValue: Nullable<string>;
  onSetSearchHandler: (value: Nullable<string>) => void;
  className: string;
};
