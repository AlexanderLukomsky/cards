import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import style from './switchShowPacks.module.scss';

import { selectAuthUserId, selectPacksParamsUserId } from 'common/selectors';
import { useAppDispatch } from 'store/hooks';
import { packsActions } from 'store/reducers/packs-reducer';

import './switchShowPacks.scss';

export const SwitchShowPacks = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const { setUserPacksId } = packsActions;
  const authUserId = useSelector(selectAuthUserId);
  const user_id = useSelector(selectPacksParamsUserId);

  const isMyPacks = user_id === authUserId;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const onMyPacks = (): void => {
    setSearchParams({ userPack: authUserId });
    dispatch(setUserPacksId(authUserId));
  };

  const onAllPacks = (): void => {
    dispatch(setUserPacksId(null));
    setSearchParams({ userPack: 'all' });
  };

  return (
    <div className={`${style.switcher} packs-switcher`}>
      <div className={style.switcher__title}>Show packs cards</div>
      <div className={style.switcher__buttons}>
        <Button
          className={isMyPacks ? 'active' : ''}
          onClick={onMyPacks}
          color="primary"
          variant={isMyPacks ? 'contained' : 'text'}
        >
          My
        </Button>
        <Button
          className={!isMyPacks ? 'active' : ''}
          onClick={onAllPacks}
          color="primary"
          variant={!isMyPacks ? 'contained' : 'text'}
        >
          All
        </Button>
      </div>
    </div>
  );
};
