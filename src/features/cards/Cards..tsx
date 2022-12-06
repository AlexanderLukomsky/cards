import { useEffect } from 'react';

import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { CardsFooter } from './cards-footer';
import { CardsHeader } from './cards-header';
import { CardsTable } from './cards-table';
import style from './cards.module.scss';

import {
  selectAuthUserId,
  selectCardsCurrentPage,
  selectCardsIsInitialized,
  selectCardsNotice,
  selectCardsPackUserId,
  selectCardsPageCount,
  selectCardsStatus,
  selectCardsTotalCount,
  selectIsAuth,
  selectSearchCardName,
} from 'common/selectors';
import { Nullable } from 'common/types';
import { CustomizedSnackbar } from 'components/customized-snackbar';
import { LoaderFullSize } from 'components/loader-full-size';
import { appPath } from 'components/routes/path';
import { Search } from 'components/search';
import { useAppDispatch } from 'store/hooks';
import {
  getCards,
  setIsInitialized,
  setNotice,
  setPage,
  setPageCount,
  setSearchQuestionName,
} from 'store/reducers/cards-reducer';

export const Cards = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id: string }>();

  const isAuth = useSelector(selectIsAuth);
  const userId = useSelector(selectAuthUserId);

  const status = useSelector(selectCardsStatus);
  const isInitialized = useSelector(selectCardsIsInitialized);
  const notice = useSelector(selectCardsNotice);
  const cardsTotalCount = useSelector(selectCardsTotalCount);
  const pageCount = useSelector(selectCardsPageCount);
  const searchCardName = useSelector(selectSearchCardName);
  const page = useSelector(selectCardsCurrentPage);
  const ownerId = useSelector(selectCardsPackUserId);

  const packId = params.id;
  const isOwner = userId === ownerId;

  const handleCloseSnackbar = (): void => {
    dispatch(setNotice({ notice: '' }));
  };

  const handlePageCountChange = (pageCount: number): void => {
    dispatch(setPageCount(pageCount));
  };

  const handlePageChange = (page: number): void => {
    dispatch(setPage(page));
  };

  const handlerSetByQuestionNameSearch = (value: Nullable<string>): void => {
    dispatch(setSearchQuestionName(value));
  };

  const handleClearSearchButtonClick = (): void => {
    dispatch(setSearchQuestionName(null));
  };

  useEffect(() => {
    if (packId) {
      dispatch(getCards({ cardsPack_id: packId }));
    }

    return () => {
      dispatch(setIsInitialized(false));
    };
  }, [dispatch, packId, pageCount, page, searchCardName]);

  if (!isAuth) {
    return <Navigate to={appPath.LOGIN} />;
  }

  if (!packId) {
    return <Navigate to={appPath.PACKS} />;
  }

  if (!isInitialized) {
    return (
      <div>
        <LoaderFullSize />;
        <CustomizedSnackbar
          message={notice}
          isOpen={!!notice}
          onClose={handleCloseSnackbar}
          isError={status === 'failed'}
        />
      </div>
    );
  }

  return (
    <div className={style.cards_page}>
      <CardsHeader isOwner={isOwner} packId={packId} />

      <div className={style.search_block}>
        <Search
          className={style.search}
          initialValue={searchCardName}
          onSetSearchHandler={handlerSetByQuestionNameSearch}
        />
        <Button
          className={style.button}
          variant="outlined"
          size="small"
          color="inherit"
          onClick={handleClearSearchButtonClick}
        >
          <ClearIcon fontSize="small" />
        </Button>
      </div>

      <CardsTable packId={packId} isOwner={isOwner} />

      <CardsFooter
        page={page}
        pageCount={pageCount}
        onChangePageCount={handlePageCountChange}
        onChangePage={handlePageChange}
        cardsTotalCount={cardsTotalCount}
      />

      <CustomizedSnackbar
        message={notice}
        isOpen={!!notice}
        onClose={handleCloseSnackbar}
        isError={status === 'failed'}
      />

      {status === 'pending' && <LoaderFullSize />}
    </div>
  );
};
