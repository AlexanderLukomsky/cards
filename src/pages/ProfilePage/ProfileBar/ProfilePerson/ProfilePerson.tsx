import { useAppDispatch, useAppSelector } from "../../../../store/store"
import LogoutIcon from '@mui/icons-material/Logout';
import "./profilePerson.scss"
import { IconButton, TextField } from "@mui/material";
import { editedProfile, logout } from "../../../../App/reducers/authReducer";
import React, { ChangeEvent, useState } from "react";
import { ModalContainer } from "../../../../Components/ModalContainer/ModalContainer";
import { AppCircularProgress } from "../../../../Components/AppCircularProgress/AppCircularProgress";
export const ProfilePerson: React.FC<PropsType> = React.memo(({ offEditMode }) => {
   const { auth } = useAppSelector(state => state)
   const [error, setError] = useState<boolean>(false)
   const [isEditMode, setIsEditMode] = useState(false)
   const [userName, setUserName] = useState(auth.authData.name)
   const [imgUrl, setImgUrl] = useState('')
   const dispatch = useAppDispatch()
   const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => { setUserName(e.currentTarget.value) }
   const onChangeImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError(false)
      setImgUrl(e.currentTarget.value)
   }
   const onLogoutHandler = () => {
      dispatch(logout())
   }
   const onEditModeHandler = () => {
      setIsEditMode(true)
   }
   const setEditedProfile = async () => {
      const trimImgUrl = imgUrl.trim()
      const isValidated = await validateImg(trimImgUrl)
      if (!isValidated) {
         setError(true)
         return
      }
      const data = {
         name: userName,
         avatar: trimImgUrl ? trimImgUrl : undefined
      }
      if (auth.authData.name === data.name && !data.avatar) {
         onCloseHandler()
         return
      }
      const res = await dispatch(editedProfile(data))
      if (res.type !== editedProfile.rejected.type) {
         onCloseHandler()
         setImgUrl('')
      }
   }
   const validateImg = async (trimImgUrl: string) => {
      if (!trimImgUrl) { return true }
      const res = new Promise(res => {
         const img = new Image()
         img.src = trimImgUrl
         img.onload = () => res(true)
         img.onerror = () => res(false)
      })
      return res
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
         {!offEditMode && <button className="profile-person__edit-btn" onClick={onEditModeHandler}>Edit profile</button>}
         <ModalContainer
            isOpenModal={isEditMode}
            onClose={onCloseHandler}
            title={{ name: 'Edit Profile' }}
            firstBtnProps={{ title: 'Cancel', onClick: onCloseHandler }}
            secondBtnProps={{ title: 'Save', onClick: setEditedProfile, disabled: error }}
         >
            {auth.authStatus === 'loading' && <AppCircularProgress />}
            <TextField variant="standard" label={'new profile img'} value={imgUrl} onChange={onChangeImgHandler} />
            <span className={`profile-person__img-description${error ? ' error' : ''}`}>
               {error ? 'wrong image, try another one' : 'base64 or lint to img'}
            </span>
            <TextField variant="standard" label={'new name'} value={userName} onChange={onChangeNameHandler} />
         </ModalContainer>
      </div>
   )
})
type PropsType = {
   offEditMode?: boolean
}