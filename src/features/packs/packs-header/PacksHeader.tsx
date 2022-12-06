import { useSelector } from 'react-redux';

import { AddNewPack } from './add-new-pack';
import { PacksCountFilter } from './packs-count-filter';
import { PacksResetSettings } from './packs-reset-settings';
import style from './packsHeader.module.scss';
import { SwitchShowPacks } from './switch-show-packs';

import { selectSearchPacksName } from 'common/selectors';
import { Nullable } from 'common/types';
import { Search } from 'components/search';
import { useAppDispatch } from 'store/hooks';
import { packsActions } from 'store/reducers/packs-reducer';

export const PacksHeader = (): JSX.Element => {
  const { resetParams } = packsActions;

  const dispatch = useAppDispatch();
  const { setSearchPacksName } = packsActions;
  const searchPacksName = useSelector(selectSearchPacksName);

  const handlerSetSearch = (value: Nullable<string>): void => {
    dispatch(setSearchPacksName(value));
  };

  return (
    <div className={style.header}>
      <div className={style.header__head}>
        <h1 className={style.header__title}>Packs list</h1>
        <div>
          <AddNewPack />
        </div>
      </div>
      <div className={style.header__row}>
        <Search
          className={style.header__search}
          initialValue={searchPacksName}
          onSetSearchHandler={handlerSetSearch}
        />
        <SwitchShowPacks />
        <PacksCountFilter />
        <PacksResetSettings
          onClick={() => {
            dispatch(resetParams());
          }}
        />
      </div>
    </div>
  );
};
