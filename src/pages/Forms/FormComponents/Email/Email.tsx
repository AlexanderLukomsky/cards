import { TextField } from "@mui/material"
import React, { ChangeEvent, useState } from "react"
import "./email.scss";
type PropsType = {
    error?: string | null
    value: string
    onChange: (value: string) => void
    onBlur?: () => void
}
export const Email = React.memo(({ value, error, onBlur, onChange }: PropsType) => {
    const [focus, setFocus] = useState<boolean>(false)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        onBlur && onBlur()
        setFocus(false)
    }
    return (
        <div className={`email${!!error ? ' error' : ''}`}>
            <TextField className="color-error"
                variant="standard" label="Email" value={value} type="email" style={{ width: '100%' }}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                color={error ? "error" : "primary"}
                onFocus={() => { setFocus(true) }}
                focused={!!error || focus}
            />
            {!!error && <div className="email__error">{error}</div>}
        </div>
    )
})