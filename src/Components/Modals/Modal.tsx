import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/store';
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
    },
    title: {
        fontWeight: '600',
        fontSize: '18px',
        lineHeight: '27px',
        color: '#2D2E46',
        fontFamily: 'sans-serif',
        marginBottom: '47px'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    progress: {
        position: 'absolute' as 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '101%',
        zIndex: '1000',
        width: '100%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        backgroundColor: 'black',
        opacity: '0.5'
    }
};

export const BasicModal: React.FC<PropsType> = ({ children, isOpenModal, setIsOpenModal, title }) => {
    const status = useAppSelector(state => state.packs.status)
    useEffect(() => {
        setIsOpenModal(false)
    }, [status])
    return (
        <Modal
            open={isOpenModal}
            onClose={() => { setIsOpenModal(false) }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style.box}>
                {status === 'loading' && <div style={style.progress}><CircularProgress color="primary" size="50px" /></div>}
                <>
                    <h3 style={style.title}>{title}</h3>
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