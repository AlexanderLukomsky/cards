import React, { useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { _pagesPath } from "../_path/_pagesPath"
import { Profile } from "./Profile/Profile"
import './profilePage.scss'
import { Packs } from "../Packs/Packs"

import { PacksHeader } from "../Packs/PacksHeader/PacksHeader"
import { getProfilePacksTC, setIsInitializedProfile } from "./_profileReducer/profileReducer"
export const ProfilePage = React.memo(() => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const profile = useAppSelector(state => state.profile)
    const user_id = useAppSelector(state => state.auth.authData._id)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/main')
            return
        }
        dispatch(getProfilePacksTC(user_id))
        return () => { dispatch(setIsInitializedProfile(false)) }
    }, [dispatch, user_id, isAuth])
    return (
        <div className="profile_page">
            <Header page="profile" />
            <div className="profile_page__container container">
                <div className="profile_page__columns">
                    <Profile />
                    <div className="packs-wrapper">
                        <PacksHeader />
                        <Packs packs={profile.packs.cardPacks} isInitialized={profile.isInitializedPacks} />
                    </div>
                </div>
            </div>
        </div>
    )
})