import moment from "moment"
import React, { useState } from "react"
import { IconButton, TableBody, TableCell, TableRow } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../../store/store"
import { _pagesPath } from "../../../../Routes/_path/pagesPath"
import { PacksDeletePackModal } from "../../PacksModals/PacksDeletePackModal/PacksDeletePackModal"
import { PacksEditPackNameModal } from "../../PacksModals/PacksEditPackNameModal/PacksEditPackNameModal"
import { PacksType } from "../../../../../api/packs-api";
import SchoolIcon from '@mui/icons-material/School';
import { setSelectedPack } from "../../../reducer/packsReducer"
export const PacksListContainer: React.FC<PropsType> = React.memo(({ packs, openTrainingModal }) => {
   const dispatch = useAppDispatch()
   const navigate = useNavigate()
   const authId = useAppSelector(state => state.auth.authData._id)

   const formatDate = (date: Date) => {
      const formatedDateAsArr = moment(date).format("DD.MM.YYYY").split('.')
      return formatedDateAsArr
   }
   const goToCards = (id: string) => {
      navigate(_pagesPath.CARDSMAIN + id)
   }
   const onOpenTrainingModal = (data: { cardsPack_id: string, cardsCount: number, name: string }) => {
      dispatch(setSelectedPack(data))
      openTrainingModal()
   }
   return (
      <TableBody>
         {packs.map(p =>
            <TableRow key={p._id}>
               <TableCell onClick={() => { goToCards(p._id) }} className="packs-list__pack-name" component="th" scope="row">{p.name}</TableCell>
               <TableCell align="center">{p.cardsCount}</TableCell>
               <TableCell align="center" className="packs-list__update-date">
                  {
                     formatDate(p.updated).map((d, i, arr) => i < arr.length - 1 ?
                        <span key={i}>{d}<span>.</span></span> :
                        <span key={i}>{d}</span>)
                  }
               </TableCell>
               <TableCell align="center" className="packs-list__user-name">{p.user_name}</TableCell>
               <TableCell align="center">
                  {
                     authId === p.user_id && <>
                        <PacksDeletePackModal packName={p.name} packId={p._id} />
                        <PacksEditPackNameModal packName={p.name} packId={p._id} />
                     </>
                  }
                  <IconButton onClick={() => { onOpenTrainingModal({ cardsPack_id: p._id, cardsCount: p.cardsCount, name: p.name }) }}><SchoolIcon /></IconButton>
               </TableCell>
            </TableRow>
         )}
      </TableBody>
   )
})
type PropsType = {
   packs: PacksType[]
   openTrainingModal: () => void
}

