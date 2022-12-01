import React, {FC, useState} from "react";
import {dataSortTC} from "../../cardsReducer";
import {useAppDispatch} from "../../../../app/store";
import arrow from "./../../../../assets/icons/Polygon 2.png"
import style from "./SortArrow.module.scss"

type SortArrowsPropsType = {
    packId: string
    value: string
}

export const SortArrows: FC<SortArrowsPropsType> = ({packId, value}) => {

    const dispatch = useAppDispatch()
    const [up, setUp] = useState(true)

    const sortUpDataHandler = () => {
        dispatch(dataSortTC({packId, direction:0, value}))
        setUp(!up)
    }
    const sortDownDataHandler = () => {
        dispatch(dataSortTC({packId, direction:1, value}))
        setUp(!up)
    }

    return (
        <span className={style.block}>
            {up
                ? <button onClick={sortUpDataHandler}>
                    <img src={arrow} alt={'0'} className={style.buttonUp} />
                </button>
                : <button onClick={sortDownDataHandler}>
                    <img src={arrow} alt={'0'} className={style.buttonDown} />
                </button>
            }
        </span>
    )
}