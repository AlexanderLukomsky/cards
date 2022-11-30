import { IconButton, TableBody, TableCell, TableRow } from "@mui/material"
import moment from "moment"
import React from "react"
import { PacksType } from "../../../api/packs-api"
import { useAppSelector } from "../../../store/store"
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PacksDeletePackModal } from "../../../pages/PacksPage/Packs/PacksModals/PacksDeletePackModal/PacksDeletePackModal"
import { PacksEditPackNameModal } from "../../../pages/PacksPage/Packs/PacksModals/PacksEditPackNameModal/PacksEditPackNameModal"
import { useNavigate } from "react-router-dom"
import { _pagesPath } from "../../../pages/Routes/_path/pagesPath"
export const TableBodyContainer: React.FC<PropsType> = React.memo(({ packs }) => {
   const navigate = useNavigate()
   const authId = useAppSelector(state => state.auth.authData._id)
   const formatDate = (date: Date) => {
      return moment(date).format("DD.MM.YYYY")
   }
   const openPackCardsHandler = (id: string) => {
      navigate(_pagesPath.CARDSMAIN + id)
   }
   return (
      <TableBody>
         {packs.map(p =>
            <TableRow key={p._id}>
               <TableCell component="th" scope="row">{p.name}</TableCell>
               <TableCell align="center">{p.cardsCount}</TableCell>
               <TableCell align="right">{formatDate(p.updated)}</TableCell>
               <TableCell align="center">{p.user_name}</TableCell>
               <TableCell align="center">
                  {
                     authId === p.user_id && <>
                        <PacksDeletePackModal packName={p.name} packId={p._id} />
                        <PacksEditPackNameModal packName={p.name} packId={p._id} />
                     </>
                  }
                  <IconButton onClick={() => { openPackCardsHandler(p._id) }}><VisibilityIcon /></IconButton>
               </TableCell>
            </TableRow>
         )}
      </TableBody>
   )
})
type PropsType = {
   packs: PacksType[]
}

