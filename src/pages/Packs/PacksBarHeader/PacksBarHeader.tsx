import { Button } from "@mui/material"
import React from "react"
import { getUserPack } from "../../../store/reducers/packsReducer"
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
    const id = useAppSelector(state => state.auth._id)
    const userPackId = useAppSelector(state => state.packs.userPacksId)
    const dispatch = useAppDispatch()
    const getMyPacksHandler = () => {
        dispatch(getUserPack(id))
        clearPacksStorage(['min', 'max', 'page'])
    }
    const getAllPacksHandler = () => {
        dispatch(getUserPack(null))
    }
    return (
        <div>
            <div style={style.buttons}>
                <Button
                    variant={userPackId ? 'contained' : 'outlined'}
                    color={userPackId ? 'secondary' : 'primary'}
                    onClick={getMyPacksHandler}>
                    MY
                </Button>
                <Button
                    variant={userPackId ? 'outlined' : 'contained'}
                    color={userPackId ? 'primary' : 'secondary'}
                    onClick={getAllPacksHandler}>
                    ALL
                </Button>
            </div>
            <div>
                {userPackId && <Profile />}
            </div>
        </div>
    )
})