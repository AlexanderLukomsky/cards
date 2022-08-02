import { TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { getPacksTC } from "../../../store/reducers/packsReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { AddPackModal } from "../PacksModals/CreatePackModal"
export const PacksHeader: React.FC<PropsType> = React.memo(({ isMyPacks }) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const userId = useAppSelector(state => state.auth._id)
    useEffect(() => {
        if (!isSearching) { return }
        const id = setTimeout(() => {
            if (isMyPacks) {
                dispatch(value ? getPacksTC({ packName: value, user_id: userId }) : getPacksTC({ user_id: userId }))
            } else {
                dispatch(value ? getPacksTC({ packName: value }) : getPacksTC())
            }
        }, 1000)
        return () => clearTimeout(id)
    }, [value, isSearching, dispatch, userId, isMyPacks])
    const onChange = (text: string) => {
        setValue(text)
        setIsSearching(true)
    }
    return (
        <div style={{ display: 'flex', marginBottom: '20px' }}>
            <div style={{ width: '100%', padding: '0 30px' }}>
                <TextField style={{ width: '100%', }} id="standard-basic" value={value} focused label="Search..." variant="standard" onChange={(e) => {
                    onChange(e.currentTarget.value)
                }} />
            </div>
            <div style={{ minWidth: '180px' }}>
                <AddPackModal />
            </div>
        </div>
    )
})
type PropsType = {
    isMyPacks: boolean
}