import { IconButton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import ClearIcon from '@mui/icons-material/Clear';
export const Search: React.FC<PropsType> = React.memo(
    ({ onChange, value, setSearchValue }) => {
        const [isSearching, setIsSearching] = useState(false)
        useEffect(() => {
            if (!isSearching) { return }
            const id = setTimeout(() => {
                setSearchValue(value)
            }, 1000)
            return () => clearTimeout(id)
        }, [value, isSearching])
        const onChangeHandler = (text: string) => {
            onChange(text)
            setIsSearching(true)
        }
        const clearSearchValueHandler = () => {
            setIsSearching(false)
            setSearchValue(null)
            onChange('')
        }
        return (
            <div style={{ width: '100%', padding: '0 30px 0 0', display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={clearSearchValueHandler} style={{ marginRight: "20px" }}><ClearIcon fontSize="large" /></IconButton>
                <TextField style={{ width: '100%', }} id="standard-basic" value={value} label="Search..." variant="standard" onChange={(e) => {
                    onChangeHandler(e.currentTarget.value)
                }} />
            </div>
        )
    })
type PropsType = {
    onChange: (text: string) => void
    value: string
    setSearchValue: (value: string | null) => void
}