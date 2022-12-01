import { Table, TableContainer } from "@mui/material";
import { ChangeEvent, FC, useEffect, useState } from "react";
import React from "react";
import { getCardsTC, setPage, setPageCount } from "../cardsReducer";
import styles from "./cardsTable.module.scss"
import { useAppDispatch, useAppSelector } from "../../../app/store";
import useDebounce from "../../../common/utils/hooks";
import { CardsFooter } from "../cardsFooter/cardsFooter";
import { TableHeader } from "./tableHeader/TableHeader";
import { TableCardHead } from "./tableCardHead/TableCardHead";
import { TableCardBody } from "./tableCardBody/TableCardBody";

type CardsTablePropsType = {
   isOwner: boolean
   packId: string
}

export const CardsTable: FC<CardsTablePropsType> = ({ isOwner, packId }) => {

   const dispatch = useAppDispatch()
   const pageCount = useAppSelector(state => state.cards.pageCount)
   const page = useAppSelector(state => state.cards.page)
   const cardsTotalCount = useAppSelector(state => state.cards.data.cardsTotalCount)
   const localSearchItem = localStorage.getItem('searchItem')
   const [searchInput, setSearchInput] = useState<string>(localSearchItem ? localSearchItem : '')
   const debouncedValue = useDebounce<string>(searchInput, 700)


   const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value)
   }
   const onChangePageCountHandler = (pageCount: number) => {
      dispatch(setPageCount(pageCount))
   }
   const onChangePageHandler = (page: number) => {
      dispatch(setPage(page))
   }

   useEffect(() => {
      localStorage.setItem('searchItem', debouncedValue)
      dispatch(getCardsTC({ cardsPack_id: packId, cardQuestion: debouncedValue }))
   }, [debouncedValue, pageCount, page])

   return (
      <div className={styles.container}>
         <TableHeader isOwner={isOwner} packId={packId} />
         <div className={styles.searchBlock}>
            <div className={styles.searchTitle}>Search</div>
            <input type={'search'} placeholder={'Provide your text'}
               style={{ width: '100%', height: '30px', border: '1px solid rgba(0, 0, 0, 0.1)' }}
               onChange={onChangeHandler} value={searchInput} />
         </div>
         <TableContainer className={styles.table}>
            <Table aria-label="simple table">
               <TableCardHead packId={packId} isOwner={isOwner} />
               <TableCardBody isOwner={isOwner} />
            </Table>
         </TableContainer>
         <CardsFooter page={page} cardsTotalCount={cardsTotalCount}
            pageCount={pageCount} onChangePageCount={onChangePageCountHandler}
            onChangePage={onChangePageHandler} />
      </div>
   );
}