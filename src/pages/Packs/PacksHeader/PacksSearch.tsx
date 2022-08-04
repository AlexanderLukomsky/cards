import React, { useState } from "react"
import { Search } from "./Search";
export const PacksSearch: React.FC<PropsType> = React.memo(({ initValue, callback }) => {
    const [value, setValue] = useState(initValue ? initValue : '')
    const onChange = (text: string) => {
        setValue(text)
    }
    const setSearchValue = (value: string | null) => {
        callback(value)
    }
    return <Search onChange={onChange} value={value} setSearchValue={setSearchValue} />
})
type PropsType = {
    initValue: string | null,
    callback: (value: string | null) => void
}