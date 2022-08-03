import { IconButton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { editSearchPackNameValueAC } from "../../../store/reducers/packsReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { AddPackModal } from "../PacksModals/CreatePackModal"
import ClearIcon from '@mui/icons-material/Clear';
export const PacksHeader: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()
    const userId = useAppSelector(state => state.auth._id)
    const searchPackName = useAppSelector(state => state.packs.searchPackName)
    const [value, setValue] = useState(searchPackName ? searchPackName : '')
    const [isSearching, setIsSearching] = useState(false)

    useEffect(() => {
        if (!isSearching) { return }
        const id = setTimeout(() => {
            dispatch(editSearchPackNameValueAC(value ? value : null))
        }, 1000)
        return () => clearTimeout(id)
    }, [value, isSearching, dispatch, userId])
    const onChange = (text: string) => {
        setValue(text)
        setIsSearching(true)
    }
    const clearSearchValueHandler = () => {
        dispatch(editSearchPackNameValueAC(null))
        setValue('')
    }
    return (
        <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ width: '100%', padding: '0 30px 0 0', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={clearSearchValueHandler} style={{ marginRight: "20px" }}><ClearIcon fontSize="large" /></IconButton>
                <TextField style={{ width: '100%', }} id="standard-basic" value={value} label="Search..." variant="standard" onChange={(e) => {
                    onChange(e.currentTarget.value)
                }} />
            </div>
            <div style={{ minWidth: '180px' }}>
                <AddPackModal />
            </div>
        </div>
    )
})