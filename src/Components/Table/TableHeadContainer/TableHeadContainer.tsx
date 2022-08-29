import { TableCell, TableHead, TableRow } from "@mui/material"
import React from "react"

export const TableHeadContainer: React.FC<PropsType> = React.memo(({ columns }) => {
   return (
      <TableHead>
         <TableRow>
            {columns.map((c, i) => <TableCell key={i} align={c.align}>{c.title}</TableCell>)}
         </TableRow>
      </TableHead>
   )
})
type PropsType = {
   columns: {
      title: string,
      align: "inherit" | "left" | "center" | "right" | "justify" | undefined
   }[]
} 