import { Button, IconButton, TextField } from "@mui/material"
import React, { useState } from "react"
import { BasicModal } from "../../../Components/Modals/BasicModal"
import EditIcon from '@mui/icons-material/Edit';
import { modalsValidation } from "./modalsValidation/modalsValidation";
import { useAppDispatch } from "../../../store/store";
import { editPackNameTC } from "../_packsReducer/packsReducer";
export const EditPackNameModal: React.FC<PropsType> = ({ id, packName }) => {
    const dispatch = useAppDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [value, setValue] = useState(packName)
    const [errorValue, setErrorValue] = useState('')
    const closeHandler = () => { setIsOpenModal(false) }
    const editPackNameHandler = () => {
        if (modalsValidation(value)) {
            dispatch(editPackNameTC({ _id: id, name: value.trim() }))
            return
        }
        setErrorValue('incorrect pack name')
        setValue('')
    }
    const onChangeHandler = (value: string) => {
        setErrorValue('')
        setValue(value)
    }
    return (
        <>
            <IconButton onClick={() => { setIsOpenModal(true) }}>
                <EditIcon />
            </IconButton>
            <BasicModal setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} title="Edit pack name">
                <div>
                    <TextField
                        variant="standard"
                        value={value}
                        label={!errorValue ? "Name pack" : errorValue}
                        error={!!errorValue}
                        onChange={(e) => onChangeHandler(e.currentTarget.value)}
                        fullWidth
                    />
                </div>
                <div>
                    <Button onClick={closeHandler}>Cancel</Button>
                    <Button onClick={editPackNameHandler}>Save</Button>
                </div>
            </BasicModal>
        </>

    )
}
type PropsType = {
    id: string,
    packName: string
}