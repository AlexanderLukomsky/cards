import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { _pagesPath } from "../_path/_pagesPath"
import { Profile } from "./Profile/Profile"
import './profilePage.scss'
import { Packs } from "../Packs/Packs"
import { getPacksTC } from "../../store/reducers/packsReducer"
import { PacksHeader } from "../Packs/PacksHeader/PacksHeader"
export const ProfilePage = React.memo(() => {
    const packs = useAppSelector(state => state.packs)
    const user_id = useAppSelector(state => state.auth._id)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getPacksTC({ user_id, min: 0, max: 110, page: 1 }))
    }, [dispatch, packs.updatedPacks, user_id])
    return (
        <div className="profile_page">
            <Header page="profile" />
            <div className="profile_page__container container">
                <div className="profile_page__columns">
                    <Profile />
                    <div className="packs-wrapper">
                        <PacksHeader isMyPacks={true} />
                        <Packs packs={packs.data.cardPacks} isInitialized={packs.isInitialized} />
                    </div>
                </div>

            </div>

            <NavLink to={_pagesPath.PACKS} >PACKS</NavLink>
        </div>
    )
})