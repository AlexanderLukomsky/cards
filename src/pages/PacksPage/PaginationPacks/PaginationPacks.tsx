import { Pagination } from "@mui/material"
import React, { ChangeEvent } from "react"
export const PaginationPacks: React.FC<PropsType> = React.memo(({ onChange, cardPacksTotalCount, pageCount, page }) => {
    const pageTotalCount = Math.ceil(cardPacksTotalCount / pageCount)
    return (
        <Pagination page={page} onChange={onChange} count={pageTotalCount} showFirstButton showLastButton />
    )
}
)
type PropsType = {
    onChange: (e: ChangeEvent<unknown>, page: number) => void
    cardPacksTotalCount: number
    pageCount: number
    page: number
}