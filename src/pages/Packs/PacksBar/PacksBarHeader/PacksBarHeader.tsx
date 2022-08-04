import { Button } from "@mui/material"
import React from "react"
import { setUserIdForFindPacks } from "../../_packsReducer/packsReducer"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { Profile } from "../../../ProfilePage/Profile/Profile"
const style = {
    buttons: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '30px 20px',
    },
}
export const PacksBarHeader = React.memo(() => {
    const authUserId = useAppSelector(state => state.auth.authData._id)
    const packsForUserId = useAppSelector(state => state.packs.requestParams.user_id)
    const dispatch = useAppDispatch()
    const getMyPacksHandler = () => {
        dispatch(setUserIdForFindPacks({ user_id: authUserId }))
        dispatch(setUserIdForFindPacks({ user_id: authUserId }))
    }
    const getAllPacksHandler = () => {
        dispatch(setUserIdForFindPacks({ user_id: null }))
    }
    return (
        <div>
            <div style={style.buttons}>
                <Button
                    variant={authUserId === packsForUserId ? 'contained' : 'outlined'}
                    color={authUserId === packsForUserId ? 'secondary' : 'primary'}
                    onClick={getMyPacksHandler}>
                    MY
                </Button>
                <Button
                    variant={authUserId !== packsForUserId ? 'contained' : 'outlined'}
                    color={authUserId !== packsForUserId ? 'secondary' : 'primary'}
                    onClick={getAllPacksHandler}>
                    ALL
                </Button>
            </div>
            <div>
                {(authUserId === packsForUserId) && <Profile showEdit={false} />}
            </div>
        </div>
    )
})