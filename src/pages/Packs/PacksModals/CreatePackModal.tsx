import { Button, TextField } from "@mui/material"
import { useState } from "react"
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { BasicModal } from "../../../Components/Modals/Modal";
import { useAppDispatch } from "../../../store/store";
import { createPackTC } from "../../../store/reducers/packsReducer";
import { modalsValidation } from "./modalsValidation/modalsValidation";
export const AddPackModal = () => {
    const dispatch = useAppDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [value, setValue] = useState('')
    const [errorValue, setErrorValue] = useState('')
    const closeHandler = () => { setIsOpenModal(false) }
    const addPackHandler = () => {
        if (modalsValidation(value)) {
            dispatch(createPackTC(value.trim()))
            setValue('')
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
        <div>
            <Button color="info" size="large" variant="outlined" onClick={() => {
                setIsOpenModal(true)
            }}>
                <span style={{ padding: '0 10px', fontWeight: '700' }}>Add Pack</span>
                <LibraryAddIcon />
            </Button>
            <BasicModal setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} title="Add new pack">
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
                    <Button onClick={addPackHandler}>Save</Button>
                </div>
            </BasicModal>
        </div>

    )
}