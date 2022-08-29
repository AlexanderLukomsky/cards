import { useAppDispatch, useAppSelector } from "../../../store/store"
import LogoutIcon from '@mui/icons-material/Logout';
import "./profilePerson.scss"
import { IconButton, TextField } from "@mui/material";
import { editedProfile, logout } from "../../../App/reducers/authReducer";
import React, { ChangeEvent, useState } from "react";
import { ModalContainer } from "../../../Components/ModalContainer/ModalContainer";
import { AppCircularProgress } from "../../../Components/AppCircularProgress/AppCircularProgress";
export const ProfilePerson: React.FC<PropsType> = React.memo(({ offEditMode }) => {
   const { auth } = useAppSelector(state => state)
   const [error, setError] = useState<boolean>(false)
   const [isEditMode, setIsEditMode] = useState(false)
   const [userName, setUserName] = useState(auth.authData.name)
   const [profileImg, setProfileImg] = useState('')
   const dispatch = useAppDispatch()
   const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => { setUserName(e.currentTarget.value) }
   const onChangeImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError(false)
      setProfileImg(e.currentTarget.value)
   }
   const onLogoutHandler = () => {
      dispatch(logout())
   }
   const onEditHandler = () => {
      setIsEditMode(true)
   }
   const setEditedProfile = async () => {
      const profileImgTrimValue = profileImg.trim()
      if (!validateImg(profileImgTrimValue)) {
         setError(true)
         return
      }
      const data = {
         name: userName,
         avatar: !!profileImgTrimValue ? profileImgTrimValue : undefined
      }
      if (auth.authData.name === data.name && !data.avatar) {
         onCloseHandler()
         return
      }
      const res = await dispatch(editedProfile(data))
      if (res.type !== editedProfile.rejected.type) {
         onCloseHandler()
      }

   }
   const validateImg = (profileImgTrimValue: string) => {
      const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/gm;
      if (profileImgTrimValue !== '') {
         if (!urlRegex.test(profileImgTrimValue)) {
            return false
         }
      }
      return true
   }
   const onCloseHandler = () => {
      setIsEditMode(false)
   }
   return (
      <div className="profile-person">
         <span className="profile-person__logout">
            <IconButton onClick={onLogoutHandler} disabled={auth.authStatus === 'loading'}>
               <LogoutIcon /></IconButton>
         </span>
         <div className="profile-person__img">
            <img src={auth.authData.avatar ? auth.authData.avatar : 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'} alt="person img" />
         </div>
         <div className="profile-person__title">{auth.authData.name}</div>
         <div className="profile-person__about">Front-end developer</div>
         {!offEditMode && <button className="profile-person__edit-btn" onClick={onEditHandler}>Edit profile</button>}
         <ModalContainer isOpenModal={isEditMode} onClose={onCloseHandler} title='Edit Profile' >
            {auth.authStatus === 'loading' && <AppCircularProgress />}
            <div className="profile-person__modal-body">
               <TextField variant="standard" label={'new profile img'} value={profileImg} onChange={onChangeImgHandler} />
               <span className={`profile-person__img-description${error ? ' error' : ''}`}>{error ? 'only url img' : 'url img'}</span>
               <TextField variant="standard" label={'new name'} value={userName} onChange={onChangeNameHandler} />
               <button disabled={error} className="profile-person__set-edit" onClick={setEditedProfile}>Save</button>
            </div>
         </ModalContainer>
      </div>
   )
})
type PropsType = {
   offEditMode?: boolean
}