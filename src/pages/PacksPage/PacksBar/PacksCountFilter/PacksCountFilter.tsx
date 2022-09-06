import { Slider } from "@mui/material"
import React from "react"

export const PacksCountFilter: React.FC<PropsType> = React.memo(({
   min, max, values, onChange, onMouseDown, onTouchEnd
}) => {
   return (
      <Slider
         onMouseDown={onMouseDown}
         value={values}
         onChange={onChange}
         onTouchEnd={onTouchEnd}
         color="secondary"
         disableSwap={values[1] <= 1 || values[1] <= values[0] + 1}
         valueLabelDisplay="on"
         min={min}
         max={max}
      />
   )
})
type PropsType = {
   onTouchEnd: () => void
   onMouseDown: () => void
   onChange: (event: Event, values: number | number[]) => void
   values: number[],
   min: number,
   max: number
} 