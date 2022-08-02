import { Button, IconButton } from "@mui/material"
import React, { useState } from "react"
import { BasicModal } from "../../../Components/Modals/Modal"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppDispatch } from "../../../store/store";
import { deletePackTC } from "../../../store/reducers/packsReducer";
export const DeletePackModal: React.FC<PropsType> = React.memo(({ packName, id }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const closeHandler = () => { setIsOpenModal(false) }
    const dispatch = useAppDispatch()
    const deletePack = (id: string) => {
        dispatch(deletePackTC(id))
    }
    return (
        <>
            <IconButton onClick={() => {
                setIsOpenModal(true)
            }}>
                <DeleteOutlineIcon />
            </IconButton>
            <BasicModal setIsOpenModal={closeHandler} isOpenModal={isOpenModal} title="Delete Pack">
                <div>
                    <p>
                        Do you really want to remove Pack Name - {packName}?
                        All cards will be excluded from this course.
                    </p>
                    <Button onClick={closeHandler}>Cancel</Button>
                    <Button onClick={() => { deletePack(id) }}>Delete</Button>
                </div>
            </BasicModal>
        </>

    )
})
type PropsType = {
    packName: string
    id: string
}