import { TextField } from "@mui/material"
import React, { ChangeEvent, useState } from "react"
import "./password.scss";
type PropsType = {
    error: string | null
    value: string

    onChange: (value: string) => void
    onBlur?: () => void
    label: string
}
export const Password = React.memo(({ value, error, onChange, onBlur, label }: PropsType) => {
    const [focus, setFocus] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        onBlur && onBlur()
        setFocus(false)
    }
    return (
        <div className={`password${!!error ? ' error' : ''}`}>
            <TextField style={{ width: '100%' }}
                variant="standard" label={label} value={value} type="password"
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                color={error ? "error" : "primary"}
                onFocus={() => { setFocus(true) }}
                focused={!!error || focus}
            />
            {error && <div className="password__error">{error}</div>}
        </div>
    )
})