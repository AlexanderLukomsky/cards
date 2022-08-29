import React, { useEffect, useState } from "react"
import { AppCircularProgress } from "../../../Components/AppCircularProgress/AppCircularProgress"
import { PacksCountFilter } from "../PacksCountFilter/PacksCountFilter"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { ProfilePerson } from "../../Profile/ProfilePerson/ProfilePerson"
import { SwitchSortPacks } from "../SwitchSortPacks/SwitchSortPacks"
import "./packsBar.scss"
import { setFilterValues } from "../reducer/packsReducer"
export const PacksBar = React.memo(() => {
   const dispatch = useAppDispatch()
   const { packs } = useAppSelector(state => state)
   const [values, setValues] = useState({ min: 0, max: 0 })
   useEffect(() => {
      setValues(packs.data.filterValues)
   }, [packs.data.filterValues])
   const onChangeFilterHandler = ((event: Event, values: number | number[]) => {
      const newValues = values as number[]
      setValues({ min: newValues[0], max: newValues[1] })
   });
   const onMouseSetFilterValues = () => {
      dispatch(setFilterValues(values))
   }
   return (
      <div className="packs-bar">
         <SwitchSortPacks />
         {
            packs.isAuthUserPacks && <div className="packs-bar__profile">
               {packs.packsStatus === 'loading' && <AppCircularProgress />}
               <ProfilePerson offEditMode={true} />
            </div>
         }
         <div className="packs-bar__filter">
            {
               packs.isInitialized && <PacksCountFilter
                  onChange={onChangeFilterHandler}
                  onMouseUp={onMouseSetFilterValues}
                  min={packs.data.minCardsCount}
                  max={packs.data.maxCardsCount}
                  values={[
                     values.min,
                     values.max
                  ]} />
            }
         </div>
      </div>
   )
})