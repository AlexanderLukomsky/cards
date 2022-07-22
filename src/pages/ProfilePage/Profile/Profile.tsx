import { TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import './profile.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutTC } from "../../../store/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { _pagesPath } from "../../_path/_pagesPath";
export const Profile = React.memo(() => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [editMode, setEditMode] = useState<boolean>(false)
    const authState = useAppSelector(state => state.auth)
    const isAuth = useAppSelector(state => state.app).isAuth
    useEffect(() => {
        if (!isAuth) { navigate(_pagesPath.MAIN) }
    }, [isAuth, navigate])
    const editProfile = () => {
        setEditMode(!editMode)
    }
    const logout = () => {
        dispatch(logoutTC())
    }
    return (
        <div className="profile">
            <button className="profile__logout"
                onClick={logout}
            ><LogoutIcon /></button>
            <div className="profile__img_container">
                <img
                    src={authState.avatar ?
                        authState.avatar :
                        'https://tinypng.com/images/social/website.jpg'}
                    alt="avatar"
                />
            </div>
            <div className="profile__info">
                {
                    editMode ?
                        <TextField style={{ marginBottom: '5px' }} /> :
                        <div className="profile__name">{authState.name}</div>
                }

                <button
                    onClick={editProfile}
                    className="profile__edit">{editMode ? 'Save' : 'Edit name'}</button>
            </div>
        </div>
    )
})