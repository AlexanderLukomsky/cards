import { Pagination, PaginationProps } from "@mui/material"
import React from "react"
import { changePacksPageAC, getPacksTC } from "../../../store/reducers/packsReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { setPacksStorage } from "../utilsPacks/setPacksStorage"

export const PaginationPacks = React.memo((props: PaginationProps) => {
    const dispatch = useAppDispatch()
    const packs = useAppSelector(state => state.packs)
    const pageTotalCount = Math.ceil(packs.data.cardPacksTotalCount / packs.data.pageCount)
    const changePage = (e: any, page: number) => {
        dispatch(changePacksPageAC(page))
        setPacksStorage({ page })
    }
    return (
        <Pagination page={packs.data.page} onChange={changePage} count={pageTotalCount} showFirstButton showLastButton />
    )

}
)