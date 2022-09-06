import moment from "moment"
import React from "react"
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../../../store/store"
import { _pagesPath } from "../../../../Routes/_path/pagesPath"
import { PacksDeletePackModal } from "../../PacksModals/PacksDeletePackModal/PacksDeletePackModal"
import { PacksEditPackNameModal } from "../../PacksModals/PacksEditPackNameModal/PacksEditPackNameModal"
import { PacksType } from "../../../../../api/packs-api";
import { PacksCardsTrainingModal } from "../../PacksModals/PacksCardsTrainingModal/PacksCardsTrainingModal";
export const PacksListContainer: React.FC<PropsType> = React.memo(({ packs }) => {
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
               <TableCell onClick={() => { openPackCardsHandler(p._id) }} className="packs-list__pack-name" component="th" scope="row">{p.name}</TableCell>
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
                  <PacksCardsTrainingModal cardsCount={p.cardsCount} cardsPack_id={p._id} />

               </TableCell>
            </TableRow>
         )}
      </TableBody>
   )
})
type PropsType = {
   packs: PacksType[]
}

