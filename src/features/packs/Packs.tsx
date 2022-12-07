import { useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useSearchParams } from 'react-router-dom';

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
  const dispatch = useAppDispatch();

  const { setNotice, setPage, setPageCount } = packsActions;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    if (params.userPack === 'all' || !params.userPack) {
      dispatch(getPacks({}));

      return;
    }

    dispatch(getPacks({ user_id: params.userPack }));
  }, [
    dispatch,
    packsState.data.page,
    packsState.data.pageCount,
    packsState.isSettings,
    packsState.params,
  ]);

  if (!isAuth) {
    return <Navigate to={appPath.LOGIN} />;
  }

  if (!packsState.isInitialized) {
    return <LoaderFullSize />;
  }

  return (
    <div className={style.packs}>
      <PacksHeader />
      <PacksTable status={packsState.status} packs={packsState.data.cardPacks} />
      <PacksFooter
        onPageChangeHandler={handleChangePage}
        onChangePageCount={handleChangePageCount}
        page={packsState.data.page}
        cardPacksTotalCount={packsState.data.cardPacksTotalCount}
        pageCount={packsState.data.pageCount}
      />

      <CustomizedSnackbar
        message={packsState.notice}
        isOpen={!!packsState.notice}
        isError
        onClose={handleCloseSnackbar}
      />
      {packsState.status === 'pending' && <LoaderFullSize />}
    </div>
  );
};
type ParamsType = {
  [key: string]: string;
};
