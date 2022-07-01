const initState: loginStateType = ''
export const loginReducer = (state: loginStateType = initState, action: ActionType): loginStateType => {
    switch (action.type) {
        default: return state
    }
}
type loginStateType = ''
type ActionType = { type: any }