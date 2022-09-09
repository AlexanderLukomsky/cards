import { PacksCountFilter } from "../../PacksPage/PacksBar/PacksCountFilter/PacksCountFilter"
import { ProfilePerson } from "./ProfilePerson/ProfilePerson"
import "./profileBar.scss"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { useEffect, useState } from "react"
import { setProfileFilterValues } from "../reducer/profileReducer"
export const ProfileBar = () => {
   const dispatch = useAppDispatch()
   const { profile } = useAppSelector(state => state)
   const [values, setValues] = useState(profile.data.filterValues)
   const [isChanged, setIsChanged] = useState(false)

   useEffect(() => {
      if (isChanged) { onSetProfileFilterValues() }
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
   const onSetProfileFilterValues = () => {
      dispatch(setProfileFilterValues(values))
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
      <div className="profile__bar profile-bar">
         <ProfilePerson />
         <div className="profile-bar__filter-container">
            <div className="profile-bar__filter">
               {
                  (profile.data.maxCardsCount > 1 && profile.data.minCardsCount !== profile.data.maxCardsCount) && <PacksCountFilter
                     onMouseDown={onMouseDownHandler}
                     onTouchEnd={onSetProfileFilterValues}
                     onChange={onChangeFilterValues}
                     min={profile.data.minCardsCount}
                     max={profile.data.maxCardsCount}
                     values={[
                        values.min,
                        values.max
                     ]} />
               }
            </div>
         </div>
      </div>
   )
}