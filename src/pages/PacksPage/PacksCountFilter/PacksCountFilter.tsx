import { Slider } from "@mui/material"
import React from "react"

export const PacksCountFilter: React.FC<PropsType> = React.memo(({
   min, max, values, onChange, onMouseUp
}) => {
   return (
      <Slider
         value={values}
         onChange={onChange}
         onMouseUp={onMouseUp}
         onTouchEnd={onMouseUp}
         disableSwap={true}
         color="secondary"
         size='medium'
         valueLabelDisplay="on"
         min={min}
         max={max}
      />
   )
})
type PropsType = {
   onChange: (event: Event, values: number | number[]) => void
   onMouseUp: () => void
   values: number[],
   min: number,
   max: number
} 