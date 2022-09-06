import { Pagination } from "@mui/material"
import React, { ChangeEvent } from "react"
export const PacksPagination: React.FC<PropsType> = React.memo(({ onChange, totalCount, pageCount, page }) => {
    const pageTotalCount = Math.ceil(totalCount / pageCount)
    return (
        <Pagination page={page} onChange={onChange} count={pageTotalCount} showFirstButton showLastButton />
    )
}
)
type PropsType = {
    onChange: (e: ChangeEvent<unknown>, page: number) => void
    totalCount: number
    pageCount: number
    page: number
}