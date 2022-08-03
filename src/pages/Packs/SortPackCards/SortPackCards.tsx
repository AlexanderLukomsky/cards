import { Slider } from "@mui/material"
import React, { useEffect, useState } from "react"
import { getPacksTC } from "../_packsReducer/packsReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { setPacksStorage } from "../utilsPacks/setPacksStorage"

export const SortPackCards: React.FC = React.memo(() => {
    const packs = useAppSelector(state => state.packs)
    useEffect(() => {
        setMinMax([packs.params.min, packs.params.max])
    }, [packs.params])
    const dispatch = useAppDispatch()
    const [minMax, setMinMax] = useState<number[]>([packs.params.min, packs.params.max])
    const changeMinMaxCardsValue = (event: Event, values: number | number[]) => {
        setMinMax(values as number[])
    };
    const sortByCardsNumber = (min: number, max: number) => {
        const sortValues = { min, max }
        dispatch(getPacksTC(sortValues))
        setPacksStorage(sortValues)
    }
    return (
        <Slider
            value={minMax}
            onChange={changeMinMaxCardsValue}
            onMouseUp={() => sortByCardsNumber(minMax[0], minMax[1])}
            disableSwap={true}
            color="secondary"
            size='medium'
            valueLabelDisplay="on"
            min={packs.data.minCardsCount}
            max={packs.data.maxCardsCount ? packs.data.maxCardsCount : 110}
        />
    )
})