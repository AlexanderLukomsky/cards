const initState: InitStateType = ''
export const registrationReducer = (state: InitStateType = initState, action: ActionType): InitStateType => {
    switch (action.type) {
        default: return state
    }
}
type InitStateType = string
type ActionType = { type: any }