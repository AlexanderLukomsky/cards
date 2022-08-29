import { IconButton, TextField } from "@mui/material"
import React, { ChangeEvent, useEffect, useState } from "react"
import ClearIcon from '@mui/icons-material/Clear';
export const PacksSearch: React.FC<PropsType> = React.memo((
   { setSearchValue }
) => {
   const [value, setValue] = useState('')
   const [isSearching, setIsSearching] = useState(false)
   useEffect(() => {
      if (!isSearching) { return }
      const id = setTimeout(() => {
         setSearchValue(value)
      }, 1000)
      return () => clearTimeout(id)
   }, [value, isSearching])
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
      setIsSearching(true)
   }
   const clearSearchValueHandler = () => {
      setIsSearching(false)
      setValue('')
      setSearchValue('')
   }
   return (
      <div style={{ width: '100%', padding: '0 30px', display: 'flex', alignItems: 'center' }}>
         <TextField style={{ width: '100%', }}
            id="standard-basic"
            value={value}
            label="Search..."
            variant="standard"
            onChange={onChangeHandler} />
         <IconButton onClick={clearSearchValueHandler}><ClearIcon fontSize="large" /></IconButton>
      </div>
   )
})
type PropsType = {
   setSearchValue: (value: string) => void
}