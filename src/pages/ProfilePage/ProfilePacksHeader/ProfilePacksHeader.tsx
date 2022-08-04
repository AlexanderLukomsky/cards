import React from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { PacksSearch } from "../../Packs/PacksHeader/PacksSearch";
import { AddPackModal } from "../../Packs/PacksModals/CreatePackModal";
import { editSearchPackNameValue } from "../_profileReducer/profileReducer";
export const ProfilePacksHeader: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()
    const searchPackName = useAppSelector(state => state.profile.requestParams.packName)
    const setSearchValue = (value: string | null) => {
        dispatch(editSearchPackNameValue({ packName: value ? value : null }))
    }
    return (
        <div style={{ display: 'flex', marginBottom: '20px' }}>
            <PacksSearch callback={setSearchValue} initValue={searchPackName} />
            <div style={{ minWidth: '180px' }}>
                <AddPackModal />
            </div>
        </div>
    )
})
export default ''