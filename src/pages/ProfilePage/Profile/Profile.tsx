import { Button, IconButton, LinearProgress, TextField } from "@mui/material"
import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import './profile.scss'
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutTC } from "../../../store/reducers/authReducer";
import { _pagesPath } from "../../_path/_pagesPath";
import { updateProfileTC } from "../../../store/reducers/profileReducer";
export const Profile: React.FC<PropsType> = React.memo(({ showEdit = true }) => {
    const dispatch = useAppDispatch()
    const profileState = useAppSelector(state => state.profile)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [name, setName] = useState(profileState.authData.name)
    const onChangeNameHandler = (value: string) => {
        setName(value)
    }
    const editProfileMod = () => {
        setEditMode(!editMode)
    }
    const logout = () => {
        dispatch(logoutTC())
    }
    const setEditedData = () => {
        dispatch(updateProfileTC({ name }))
        setEditMode(!editMode)
    }
    return (
        <div className="profile">
            <IconButton className="profile__logout" onClick={logout}>
                <LogoutIcon />
            </IconButton>
            <div className="profile__img_container">
                <img
                    src={profileState.authData.avatar ?
                        profileState.authData.avatar :
                        'https://tinypng.com/images/social/website.jpg'}
                    alt="avatar"
                />
            </div>
            {
                profileState.status === 'loading' ?
                    <div className="profile__info" style={{ width: '100%' }}><LinearProgress style={{ width: '100%' }} /></div> :
                    <div className="profile__info">
                        {
                            editMode ?
                                <TextField style={{ marginBottom: '5px' }} value={name} onChange={(e) => { onChangeNameHandler(e.currentTarget.value) }} /> :
                                <div className="profile__name">{profileState.authData.name}</div>
                        }
                        {
                            showEdit && (editMode ? <Button onClick={setEditedData}>Save</Button> : <Button onClick={editProfileMod}>Edit name</Button>)
                        }

                    </div>
            }
        </div>
    )
})
type PropsType = {
    showEdit?: boolean
}