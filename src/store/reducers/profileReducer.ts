
import { AppThunk } from './../store';
const initState: profileStateType = ''
export const profileReducer = (state: profileStateType = initState, action: ActionType): profileStateType => {
    switch (action.type) {
        default: return state
    }
}

const profileInitializedAC = (isInitialized: boolean) => (
    {
        type: 'profile/PROFILE-IS-INITIALIZED',
        payload: { isInitialized }
    } as const
)
export const profileInitializedTC = (): AppThunk => (dispatch) => {

}

type profileStateType = ''
type ActionType = { type: any }