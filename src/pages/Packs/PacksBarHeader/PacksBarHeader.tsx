import React from "react"
import { useAppSelector } from "../../../store/store"
import { Profile } from "../../ProfilePage/Profile/Profile"

export const PacksBarHeader = React.memo(() => {
    const id = useAppSelector(state => state.auth._id)
    console.log(id);
    const getMyPacks = () => {

    }
    const getAllPacks = () => {

    }
    return (
        <div>
            <div><button onClick={getMyPacks}>MY</button></div>
            <div><button onClick={getAllPacks}>ALL</button></div>
            <div>
                <Profile />
            </div>
        </div>
    )
})