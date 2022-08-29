import { TableBody, TableCell, TableRow } from "@mui/material"
import moment from "moment"
import React from "react"
import { PacksType } from "../../../api/packs-api"

export const TableBodyContainer: React.FC<PropsType> = React.memo(({ packs }) => {
   const formatDate = (date: Date) => {
      return moment(date).format("DD.MM.YYYY")
   }
   return (
      <TableBody>
         {packs.map(p =>
            <TableRow key={p._id}>
               <TableCell component="th" scope="row">{p.name}</TableCell>
               <TableCell align="center">{p.cardsCount}</TableCell>
               <TableCell align="right">{formatDate(p.updated)}</TableCell>
               <TableCell align="center">{p.user_name}</TableCell>
               <TableCell align="right"></TableCell>
            </TableRow>
         )}
      </TableBody>
   )
})
type PropsType = {
   packs: PacksType[]
}

