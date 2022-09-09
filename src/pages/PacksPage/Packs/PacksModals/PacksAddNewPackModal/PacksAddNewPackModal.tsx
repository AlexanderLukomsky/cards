import { Button, TextField } from "@mui/material"
import React, { ChangeEvent, useState } from "react"
import { AppCircularProgress } from "../../../../../Components/AppCircularProgress/AppCircularProgress"
import { ModalContainer } from "../../../../../Components/ModalContainer/ModalContainer"
import { useAppDispatch, useAppSelector } from "../../../../../store/store"
import { addNewPack } from "../../../reducer/packsReducer"
//button
export const PacksAddNewPackModal = React.memo(() => {
   const { packsStatus } = useAppSelector(state => state.packs)
   const dispatch = useAppDispatch()
   const [openModal, setOpenModal] = useState(false)
   const [packName, setPackName] = useState('')
   const [error, setError] = useState('')
   const onOpenModal = () => {
      setOpenModal(true)
   }
   const onCloseModal = () => {
      setPackName('')
      setError('')
      setOpenModal(false)
   }
   const onAddNewPack = async () => {
      if (packName.trim() === '') {
         setError('enter package name')
         return
      }
      if (packName.trim().length > 30) {
         setError('maximum length 30')
         return
      }
      const action = await dispatch(addNewPack(packName))
      if (!addNewPack.rejected.match(action)) {
         onCloseModal()
      }
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError('')
      setPackName(e.currentTarget.value)
   }
   return <>
      <Button className="add-new-pack-btn" variant="contained" color="secondary" onClick={onOpenModal}>Add new pack</Button>
      {
         openModal && <ModalContainer
            isOpenModal={openModal}
            onClose={onCloseModal}
            title='Add new pack'
            firstBtnProps={{ title: 'Cancel', onClick: onCloseModal }}
            secondBtnProps={{ title: 'Save', onClick: onAddNewPack, disabled: packsStatus === 'loading' }}
         >
            {packsStatus === 'loading' && <AppCircularProgress />}
            <TextField variant="standard" className={error ? 'error' : ''}
               label={`${error ? error : 'Name pack'}`}
               value={packName} onChange={onChangeHandler}
            />
         </ModalContainer>
      }
   </>

})
//modal