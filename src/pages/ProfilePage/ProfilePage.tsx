import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Profile } from "./Profile/Profile"
import './profilePage.scss'
import { Packs } from "../Packs/Packs"
import { getPacksTC } from "../Packs/_packsReducer/packsReducer"
import { ProfilePacksHeader } from "./ProfilePacksHeader/ProfilePacksHeader"
export const ProfilePage = React.memo(() => {
    const packs = useAppSelector(state => state.packs)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const profile = useAppSelector(state => state.profile)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (!isAuth) {
            navigate('/main')
            return
        }
        dispatch(getPacksTC(profile.requestParams))
    }, [dispatch, navigate, isAuth, packs.updatedPacks, profile.requestParams])
    return (
        <div className="profile_page">
            <Header page="profile" />
            <div className="profile_page__container container">
                <div className="profile_page__columns">
                    <Profile />
                    <div className="packs-wrapper">
                        <ProfilePacksHeader />
                        <Packs packs={packs.data.cardPacks} isInitialized={packs.isInitialized} />
                    </div>
                </div>
            </div>
        </div>
    )
})