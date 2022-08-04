import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType } from '../../../_types/types';
import { authAPI } from '../../../api/auth-api';
import { AppThunk } from '../../../store/store';
import { authInitState, setLoginAC } from '../../../store/reducers/authReducer';
const initState = {
    ...authInitState, status: 'initial', isInitializedPacks: false,
    getParams: { page: 1, pageCount: 5 }
}
const slice = createSlice({
    name: 'profile',
    initialState: initState,
    reducers: {
        updateProfileAC(state, action: PayloadAction<{ name: string }>) {
            state.authData.name = action.payload.name
        },
        setProfileStatusAC(state, action: PayloadAction<{ status: StatusType }>) {
            state.status = action.payload.status
        },
    },
    extraReducers: (buider) => {
        buider.addCase(setLoginAC, (state, action) => {
            state.authData = action.payload.data;
            state.status = 'initial'
        })
    }
})
export const { updateProfileAC, setProfileStatusAC } = slice.actions
export const profileReducer = slice.reducer
//TC
export const updateProfileTC = (model: { name?: string, avatar?: string }): AppThunk => async (dispatch) => {
    try {
        dispatch(setProfileStatusAC({ status: 'loading' }))
        const res = await authAPI.update(model)
        dispatch(updateProfileAC({ name: res.data.updatedUser.name }))
    } finally {
        dispatch(setProfileStatusAC({ status: 'initial' }))
    }

}


