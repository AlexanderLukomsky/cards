import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PacksFooter } from './packs-footer';
import { PacksHeader } from './packs-header';
import { PacksTable } from './packs-table';
import style from './packs.module.scss';

import { selectIsAuth } from 'common/selectors';
import { selectPacks } from 'common/selectors/selectors';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { LoaderFullSize } from 'components/loader-full-size';
import { appPath } from 'components/routes/path';
import { useAppDispatch } from 'store/hooks';
import { getPacks, packsActions } from 'store/reducers/packs-reducer';

export const Packs = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { setNotice, setPage, setPageCount, initSettings } = packsActions;

  const [searchParams, setSearchParams] = useSearchParams();

  const isAuth = useSelector(selectIsAuth);
  const packsState = useSelector(selectPacks);

  const handleCloseSnackbar = (): void => {
    dispatch(setNotice(''));
  };

  const handleChangePage = (page: number): void => {
    dispatch(setPage(page));
  };

  const handleChangePageCount = (pageCount: number): void => {
    dispatch(setPageCount(pageCount));
  };

  const params: ParamsType = {};

  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  useEffect(() => {
    if (packsState.params.user_id && !params.userPack) {
      setSearchParams({ userPack: packsState.params.user_id });
    }
    if (!packsState.isSettings) {
      if (params.userPack === 'all') {
        setSearchParams({ userPack: 'all' });
        dispatch(initSettings({ user_id: null }));
      } else {
        dispatch(initSettings({ ...params, user_id: params.userPack }));
      }

      return;
    }
    if (!isAuth) {
      navigate(appPath.LOGIN);

      return;
    }

    dispatch(getPacks());
  }, [
    dispatch,
    packsState.data.page,
    packsState.data.pageCount,
    packsState.isSettings,
    packsState.params,
  ]);

  return (
    <div className={style.packs}>
      {packsState.isInitialized && (
        <>
          <PacksHeader />
          <PacksTable status={packsState.status} packs={packsState.data.cardPacks} />
          <PacksFooter
            onPageChangeHandler={handleChangePage}
            onChangePageCount={handleChangePageCount}
            page={packsState.data.page}
            cardPacksTotalCount={packsState.data.cardPacksTotalCount}
            pageCount={packsState.data.pageCount}
          />
        </>
      )}
      {packsState.status === 'pending' && <LoaderFullSize />}
      <CustomizedSnackbar
        message={packsState.notice}
        isOpen={!!packsState.notice}
        isError
        onClose={handleCloseSnackbar}
      />
    </div>
  );
};
type ParamsType = {
  [key: string]: string;
};
