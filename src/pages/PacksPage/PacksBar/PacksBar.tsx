import React, { useCallback, useEffect, useState } from "react"
import { AppCircularProgress } from "../../../Components/AppCircularProgress/AppCircularProgress"
import { PacksCountFilter } from "./PacksCountFilter/PacksCountFilter"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { ProfilePerson } from "../../ProfilePage/ProfileBar/ProfilePerson/ProfilePerson"
import { SwitchSortPacks } from "./SwitchSortPacks/SwitchSortPacks"
import "./packsBar.scss"
import { setFilterValues } from "../reducer/packsReducer"
export const PacksBar = React.memo(() => {
   const dispatch = useAppDispatch()
   const { packs } = useAppSelector(state => state)
   const [values, setValues] = useState(packs.data.filterValues)
   const [isChanged, setIsChanged] = useState(false)
   const setStateFilterValues = () => {
      dispatch(setFilterValues(values))
   }
   useEffect(() => {
      if (isChanged) { setStateFilterValues() }
   }, [isChanged])
   const onChangeFilterValues = (event: Event, values: number | number[]) => {
      const valuesAsArray = values as number[]
      const currentValues = {
         min: valuesAsArray[0],
         max: valuesAsArray[1]
      }
      if (currentValues.max < 1) {
         return
      }
      setValues(currentValues)
   }
   const onMouseUpHandler = () => {
      setIsChanged(true)
      window.removeEventListener('mouseup', onMouseUpHandler)
   }
   const onMouseDownHandler = () => {
      setIsChanged(false)
      window.addEventListener('mouseup', onMouseUpHandler)
   }
   return (
      <div className="packs__bar packs-bar">
         <SwitchSortPacks />
         <div>
            {
               packs.isAuthUserPacks && <div className="packs-bar__profile">
                  {packs.packsStatus === 'loading' && <AppCircularProgress />}
                  <ProfilePerson offEditMode={true} />
               </div>
            }
         </div>
         <div className="packs-bar__filter-container">
            {
               (packs.data.maxCardsCount > 1 && packs.data.minCardsCount !== packs.data.maxCardsCount) && <div className="packs-bar__filter">
                  {
                     packs.isInitialized && <PacksCountFilter
                        onTouchEnd={setStateFilterValues}
                        onMouseDown={onMouseDownHandler}
                        onChange={onChangeFilterValues}
                        min={packs.data.minCardsCount}
                        max={packs.data.maxCardsCount}
                        values={[
                           values.min,
                           values.max
                        ]} />
                  }
               </div>
            }
         </div>

      </div>
   )
})