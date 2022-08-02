import { Button } from "@mui/material"
import React from "react"
import { setIsMyPacksAC } from "../../../store/reducers/packsReducer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { Profile } from "../../ProfilePage/Profile/Profile"
import { clearPacksStorage } from "../utilsPacks/setPacksStorage"
const style = {
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '30px 20px',
    },
}
export const PacksBarHeader = React.memo(() => {
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks)
    const dispatch = useAppDispatch()
    const getMyPacksHandler = () => {
        dispatch(setIsMyPacksAC(true))
        clearPacksStorage(['min', 'max', 'page'])
    }
    const getAllPacksHandler = () => {
        dispatch(setIsMyPacksAC(false))
    }
    return (
        <div>
            <div style={style.buttons}>
                <Button
                    variant={isMyPacks ? 'contained' : 'outlined'}
                    color={isMyPacks ? 'secondary' : 'primary'}
                    onClick={getMyPacksHandler}>
                    MY
                </Button>
                <Button
                    variant={isMyPacks ? 'outlined' : 'contained'}
                    color={isMyPacks ? 'primary' : 'secondary'}
                    onClick={getAllPacksHandler}>
                    ALL
                </Button>
            </div>
            <div>
                {isMyPacks && <Profile />}
            </div>
        </div>
    )
})