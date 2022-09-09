import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { AppCircularProgress } from '../../../../../Components/AppCircularProgress/AppCircularProgress';
import { ModalContainer } from '../../../../../Components/ModalContainer/ModalContainer';
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { editPackName } from '../../../reducer/packsReducer';
export const PacksEditPackNameModal: React.FC<PropsType> = ({ packName, packId }) => {
   const dispatch = useAppDispatch()
   const { packsStatus } = useAppSelector(state => state.packs)
   const [openModal, setOpenModal] = useState(false)
   const [error, setError] = useState('')
   const [newPackName, setNewPackName] = useState(packName)
   const onOpenModal = () => {
      setOpenModal(true)
   }
   const onCloseModal = () => {
      setOpenModal(false)
      setError('')
      setNewPackName(packName)
   }
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError('')
      setNewPackName(e.currentTarget.value)
   }
   const onEditPackName = async () => {
      if (newPackName.trim() === '') {
         setError('enter package name')
         return
      }
      if (newPackName.trim().length > 30) {
         setError('maximum length 30')
         return
      }
      if (newPackName.trim() === packName) {
         onCloseModal()
         return
      }
      const action = await dispatch(editPackName({ _id: packId, name: newPackName, }))
      if (!editPackName.rejected.match(action)) {
         setNewPackName(newPackName)
         setOpenModal(false)
         setError('')
      }
   }
   return (
      <>
         <IconButton onClick={onOpenModal}><ModeEditIcon /></IconButton>
         {
            openModal && <ModalContainer
               isOpenModal={openModal}
               onClose={onCloseModal}
               title='Name pack name'
               firstBtnProps={{ title: 'Cancel', onClick: onCloseModal, color: "secondary" }}
               secondBtnProps={{ title: 'Save', onClick: onEditPackName, disabled: packsStatus === 'loading', color: "primary" }}
            >
               <TextField variant="standard" className={error ? 'error' : ''}
                  label={`${error ? error : 'Name pack name'}`}
                  value={newPackName} onChange={onChangeHandler}
               />
               {packsStatus === 'loading' && <AppCircularProgress />}
            </ModalContainer>
         }
      </>
   )
}
type PropsType = {
   packName: string
   packId: string
}