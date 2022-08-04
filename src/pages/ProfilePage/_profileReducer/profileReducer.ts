import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType } from '../../../_types/types';
import { authAPI } from '../../../api/auth-api';
import { AppThunk } from '../../../store/store';
import { authInitState, setLoginAC } from '../../../store/reducers/authReducer';
const initState = {
    ...authInitState, status: 'initial',
    requestParams: { page: 1, pageCount: 5, user_id: '', packName: null as string | null }
}
const slice = createSlice({
    name: 'profile',
    initialState: initState,
    reducers: {
        updateProfile(state, action: PayloadAction<{ name: string }>) {
            state.authData.name = action.payload.name
        },
        setProfileStatus(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        },
        editSearchPackNameValue(state, action: PayloadAction<{ packName: string | null }>) {
            state.requestParams.packName = action.payload.packName
        }
    },
    extraReducers: (buider) => {
        buider.addCase(setLoginAC, (state, action) => {
            state.authData = action.payload.data;
            state.requestParams.user_id = action.payload.data._id
        })
    }
})
export const { updateProfile, setProfileStatus, editSearchPackNameValue } = slice.actions
export const profileReducer = slice.reducer
//TC
export const updateProfileTC = (model: { name?: string, avatar?: string }): AppThunk => async (dispatch) => {
    try {
        dispatch(setProfileStatus({ status: 'loading' }))
        const res = await authAPI.update(model)
        dispatch(updateProfile({ name: res.data.updatedUser.name }))
    } finally {
        dispatch(setProfileStatus({ status: 'initial' }))
    }

}


