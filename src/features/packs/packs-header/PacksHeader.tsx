import { AddNewPack } from './add-new-pack';
import { PacksCountFilter } from './packs-count-filter';
import { PacksResetSettings } from './packs-reset-settings';
import style from './packsHeader.module.scss';
import { SearchPacks } from './search-packs';
import { SwitchShowPacks } from './switch-show-packs';

import { useAppDispatch } from 'store/hooks';
import { packsActions } from 'store/reducers/packs-reducer';

export const PacksHeader = (): JSX.Element => {
  const { resetParams } = packsActions;

  const dispatch = useAppDispatch();

  return (
    <div className={style.header}>
      <div className={style.header__head}>
        <h1 className={style.header__title}>Packs list</h1>
        <div>
          <AddNewPack />
        </div>
      </div>
      <div className={style.header__row}>
        <SearchPacks />
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
