import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../Components/Header/Header"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { Profile } from "./Profile/Profile"
import './profilePage.scss'
import { Packs } from "../Packs/Packs"
import { PacksHeader } from "../Packs/PacksHeader/PacksHeader"
import { getPacksTC } from "../Packs/_packsReducer/packsReducer"
export const ProfilePage = React.memo(() => {
    const packs = useAppSelector(state => state.packs)
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
        dispatch(getPacksTC({ ...profile.getParams, user_id, packName: packs.searchPackName }))
    }, [dispatch, user_id, isAuth, packs.updatedPacks, packs.searchPackName, navigate])
    //**!Profile get params??? */
    return (
        <div className="profile_page">
            <Header page="profile" />
            <div className="profile_page__container container">
                <div className="profile_page__columns">
                    <Profile />
                    <div className="packs-wrapper">
                        <PacksHeader />
                        <Packs packs={packs.data.cardPacks} isInitialized={packs.isInitialized} />
                    </div>
                </div>
            </div>
        </div>
    )
})