import { Pagination, PaginationProps } from "@mui/material"
import React from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { changePacksPageAC } from "../_packsReducer/packsReducer"
export const PaginationPacks = React.memo((props: PaginationProps) => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs)
    const pageTotalCount = Math.ceil(packs.data.cardPacksTotalCount / packs.data.pageCount)
    const changePage = (e: any, page: number) => {
        dispatch(changePacksPageAC(page))
    }
    return (
        <Pagination page={packs.data.page} onChange={changePage} count={pageTotalCount} showFirstButton showLastButton />
    )

}
)