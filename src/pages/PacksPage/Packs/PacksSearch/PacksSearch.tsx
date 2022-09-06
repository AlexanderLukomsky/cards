import { IconButton, TextField } from "@mui/material"
import React, { ChangeEvent, useEffect, useState } from "react"
import ClearIcon from '@mui/icons-material/Clear';
export const PacksSearch: React.FC<PropsType> = React.memo((
   { onSearchPacks }
) => {
   const [value, setValue] = useState('')
   const [isSearching, setIsSearching] = useState(false)
   useEffect(() => {
      if (!isSearching) { return }
      const id = setTimeout(() => {
         onSearchPacks(value)
         setIsSearching(false)
      }, 1000)
      return () => clearTimeout(id)
   }, [value, isSearching, onSearchPacks])
   const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.currentTarget.value)
      setIsSearching(true)
   }
   const clearSearchValueHandler = () => {
      setIsSearching(false)
      setValue('')
      onSearchPacks('')
   }
   return (
      <div className="packs__search">
         <TextField
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
   onSearchPacks: (value: string) => void
}