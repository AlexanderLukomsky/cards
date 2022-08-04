import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { setSortParamsAC } from "../_packsReducer/packsReducer"
import { SortCards } from "./SortCards"
export const SortPackCards: React.FC = React.memo(() => {
    const packs = useAppSelector(state => state.packs)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setMinMax([packs.requestParams.min as number, packs.requestParams.max as number])
    }, [packs.requestParams.min, packs.requestParams.max])

    const [minMax, setMinMax] = useState<number[]>([packs.requestParams.min as number, packs.requestParams.max as number])
    const onChangeMinMaxHandler = (event: Event, values: number | number[]) => {
        setMinMax(values as number[])
    };
    const setSortValue = () => {
        const sortValues = { min: minMax[0], max: minMax[1] }
        dispatch(setSortParamsAC(sortValues))
    }
    return (
        <>
            {
                (packs.data.minCardsCount !== packs.data.maxCardsCount) &&
                <SortCards values={minMax} min={packs.data.minCardsCount} max={packs.data.maxCardsCount}
                    onChange={onChangeMinMaxHandler}
                    onMouseUp={setSortValue}
                />
            }
        </>
    )
})