import { Button, ButtonProps, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import './modalContainer.scss'
const style = {
   box: {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 3
   }
};

export const ModalContainer: React.FC<PropsType> = React.memo(({ isOpenModal = false, onClose, title, children, firstBtnProps, secondBtnProps }) => {

   return (
      <Modal
         open={isOpenModal}
         onClose={onClose}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
      >
         <Box sx={style.box}>
            <>
               <div className='modal-container__header'>
                  <h3 className='modal-container__title'>{title}</h3>
                  <IconButton onClick={onClose}><CloseIcon /></IconButton>
               </div>
               <div className='modal-container__body'>
                  {children}
               </div>
               <div className='modal-container__footer'>
                  {firstBtnProps && <Button variant='outlined' color='secondary' {...firstBtnProps} >{firstBtnProps.title}</Button>}
                  {secondBtnProps && <Button variant='contained' color='primary' {...secondBtnProps} >{secondBtnProps.title}</Button>}
               </div>
            </>
         </Box>
      </Modal>
   );
})
type PropsType = {
   title: string
   isOpenModal: boolean
   onClose: () => void
   children: React.ReactNode
   firstBtnProps?: ButtonProps
   secondBtnProps?: ButtonProps
}

