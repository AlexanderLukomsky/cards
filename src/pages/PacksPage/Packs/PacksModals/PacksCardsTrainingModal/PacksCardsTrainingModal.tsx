import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from "@mui/material"
import React, { useState } from "react"
import { AppCircularProgress } from "../../../../../Components/AppCircularProgress/AppCircularProgress"
import { ModalContainer } from "../../../../../Components/ModalContainer/ModalContainer"
import { useAppDispatch, useAppSelector } from "../../../../../store/store"
import { deletePack } from '../../../reducer/packsReducer';
import SchoolIcon from '@mui/icons-material/School';
import { cardsAPI } from '../../../../../api/cards-api';
//button
export const PacksCardsTrainingModal: React.FC<PropsType> = React.memo(({ cardsCount, cardsPack_id }) => {
   const [openModal, setOpenModal] = useState(false)
   const dispatch = useAppDispatch()
   const { packsStatus } = useAppSelector(state => state.packs)
   const [data, setData] = useState<any[]>([])
   const onOpenModal = () => {
      setOpenModal(true)
      cardsAPI.getCards({ cardsPack_id, page: 1, pageCount: cardsCount }).then((res) => {
         setData(res.data.cards);

      })
   }
   const onCloseModal = () => {
      setOpenModal(false)
   }
   console.log(data[Math.floor(Math.random() * cardsCount)]);
   const onDeletePack = async () => {
      // const action = await dispatch(deletePack(packId))
      //   if (!deletePack.rejected.match(action)) {
      //   setOpenModal(false)
      //   }
   }
   return <>
      <IconButton onClick={onOpenModal}><SchoolIcon /></IconButton>
      {openModal && <ModalContainer
         isOpenModal={openModal}
         onClose={onCloseModal}
         title='Delete Pack'
         cancelBtnProps={{ title: 'Cancel', onClick: onCloseModal, color: "success" }}
         confirmBtnProps={{ title: 'Delete', onClick: onDeletePack, disabled: packsStatus === 'loading', color: "error" }}
      >
         <div className='packs__delete-modal-text'>

         </div>
         {packsStatus === 'loading' && <AppCircularProgress />}
      </ModalContainer>}
   </>

})
//modal
type PropsType = {
   cardsCount: number
   cardsPack_id: string
}