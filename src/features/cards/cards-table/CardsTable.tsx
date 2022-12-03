/* eslint-disable no-magic-numbers */
import { ChangeEvent, useEffect, useState } from 'react';

import { Table, TableContainer } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { CardsFooter } from '../cards-footer';

import styles from './cardsTable.module.scss';
import { TableCardBody } from './table-card-body';
import { TableCardHead } from './table-card-head';
import { TableHeader } from './table-header';

import {
  selectAuthUserId,
  selectCardsCurrentPage,
  selectCardsPackUserId,
  selectCardsPageCount,
  selectCardsTotalCount,
} from 'common/selectors';
import { useDebounce } from 'common/utils';
import { useAppDispatch } from 'store/hooks';
import { getCards, setPage, setPageCount } from 'store/reducers/cards-reducer';

export const CardsTable = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const params = useParams<{ id: string }>();
  const packId = params.id ? params.id : '';

  const pageCount = useSelector(selectCardsPageCount);
  const page = useSelector(selectCardsCurrentPage);
  const cardsTotalCount = useSelector(selectCardsTotalCount);
  const userId = useSelector(selectAuthUserId);
  const ownerId = useSelector(selectCardsPackUserId);

  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchInput, 700);

  const isOwner = userId === ownerId;

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchInput(event.target.value);
  };
  const handlePageCountChange = (pageCount: number): void => {
    dispatch(setPageCount(pageCount));
  };
  const handlePageChange = (page: number): void => {
    dispatch(setPage(page));
  };

  useEffect(() => {
    dispatch(getCards({ cardsPack_id: packId, cardQuestion: debouncedValue }));
  }, [debouncedValue, pageCount, page, packId, dispatch]);

  return (
    <div className={styles.container}>
      <TableHeader isOwner={isOwner} packId={packId} />
      <div className={styles.searchBlock}>
        <div className={styles.searchTitle}>Search</div>
        <input
          type="search"
          placeholder="Provide your text"
          style={{
            width: '100%',
            height: '30px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }}
          onChange={handleSearchChange}
          value={searchInput}
        />
      </div>
      <TableContainer className={styles.table}>
        <Table aria-label="simple table">
          <TableCardHead packId={packId} isOwner={isOwner} />
          <TableCardBody isOwner={isOwner} />
        </Table>
      </TableContainer>
      <CardsFooter
        page={page}
        cardsTotalCount={cardsTotalCount}
        pageCount={pageCount}
        onChangePageCount={handlePageCountChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
};
