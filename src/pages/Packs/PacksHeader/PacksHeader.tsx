import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { AddPackModal } from "../PacksModals/CreatePackModal"
import { editSearchPackNameValueAC } from "../_packsReducer/packsReducer";
import { PacksSearch } from "./PacksSearch";
export const PacksHeader: React.FC = React.memo(() => {
    const dispatch = useAppDispatch()
    const searchPackName = useAppSelector(state => state.packs.requestParams.searchPackName)
    const setSearchValue = (value: string | null) => {
        dispatch(editSearchPackNameValueAC(value ? value : null))
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