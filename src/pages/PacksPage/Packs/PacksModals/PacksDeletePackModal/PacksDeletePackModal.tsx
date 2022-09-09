import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from "@mui/material"
import React, { useState } from "react"
import { AppCircularProgress } from "../../../../../Components/AppCircularProgress/AppCircularProgress"
import { ModalContainer } from "../../../../../Components/ModalContainer/ModalContainer"
import { useAppDispatch, useAppSelector } from "../../../../../store/store"
import { deletePack } from '../../../reducer/packsReducer';
//button
export const PacksDeletePackModal: React.FC<PropsType> = React.memo(({ packName, packId }) => {
   const [openModal, setOpenModal] = useState(false)
   const dispatch = useAppDispatch()
   const { packsStatus } = useAppSelector(state => state.packs)
   const onOpenModal = () => {
      setOpenModal(true)
   }
   const onCloseModal = () => {
      setOpenModal(false)
   }
   const onDeletePack = async () => {
      const action = await dispatch(deletePack(packId))
      if (!deletePack.rejected.match(action)) {
         setOpenModal(false)
      }
   }
   return <>
      <IconButton onClick={onOpenModal} ><DeleteOutlineIcon /></IconButton>
      {openModal && <ModalContainer
         isOpenModal={openModal}
         onClose={onCloseModal}
         title='Delete Pack'
         firstBtnProps={{ title: 'Cancel', onClick: onCloseModal, color: "success" }}
         secondBtnProps={{ title: 'Delete', onClick: onDeletePack, disabled: packsStatus === 'loading', color: "error" }}
      >
         <div className='packs__delete-modal-text'>
            Do you really want to remove<span> Pack Name - {packName}? </span>
            All cards will be excluded from this course.
         </div>
         {packsStatus === 'loading' && <AppCircularProgress />}
      </ModalContainer>}
   </>

})
//modal
type PropsType = {
   packName: string
   packId: string
}