import { Slider } from "@mui/material"
import React from "react"
export const SortCards: React.FC<PropsType> = React.memo(
    ({ onChange, onMouseUp, values, min, max }) => {
        return (
            <Slider
                value={values}
                onChange={onChange}
                onMouseUp={onMouseUp}
                disableSwap={true}
                color="secondary"
                size='medium'
                valueLabelDisplay="on"
                min={min}
                max={max}
            />
        )
    }
)
type PropsType = {
    onChange: (event: Event, values: number | number[]) => void
    onMouseUp: () => void
    values: number[],
    min: number,
    max: number
}