import { CircularProgress, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/store';
import CloseIcon from '@mui/icons-material/Close';
import './basicModal.scss'
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
        p: 4
    }
};

export const BasicModal: React.FC<PropsType> = ({ children, isOpenModal, setIsOpenModal, title }) => {
    const status = useAppSelector(state => state.packs.status)
    useEffect(() => {
        setIsOpenModal(false)
    }, [status, setIsOpenModal])
    return (
        <Modal
            open={isOpenModal}
            onClose={() => { setIsOpenModal(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style.box}>
                {status === 'loading' && <div className='basic-modal__progress'><CircularProgress color="primary" size="50px" /></div>}
                <>
                    <div className='basic-modal__header'>
                        <h3 className='basic-modal__title'>{title}</h3>
                        <IconButton onClick={() => { setIsOpenModal(false) }}><CloseIcon /></IconButton>
                    </div>
                    {children}
                </>
            </Box>
        </Modal>
    );
}
type PropsType = {
    title: string
    isOpenModal: boolean
    setIsOpenModal: (isOpen: boolean) => void
    children: React.ReactNode
}