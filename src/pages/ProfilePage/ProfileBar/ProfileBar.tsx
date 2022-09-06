import { PacksCountFilter } from "../../PacksPage/PacksBar/PacksCountFilter/PacksCountFilter"
import { ProfilePerson } from "./ProfilePerson/ProfilePerson"
import "./profileBar.scss"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { useEffect, useState } from "react"
import { setProfileFilterValues } from "../reducer/profileReducer"
export const ProfileBar = () => {
   const dispatch = useAppDispatch()
   const { profile } = useAppSelector(state => state)
   const [values, setValues] = useState({ min: 0, max: 0 })
   useEffect(() => {
      setValues(profile.data.filterValues)
   }, [profile.data.filterValues])
   const onChangeFilterHandler = ((event: Event, values: number | number[]) => {
      const valuesAsArray = values as number[]
      const currentValues = {
         min: valuesAsArray[0],
         max: valuesAsArray[1]
      }
      if (currentValues.min < 1) {
         return
      }
      setValues(currentValues)
   });
   const onMouseSetFilterValues = () => {
      dispatch(setProfileFilterValues(values))
   }
   return (
      <div className="profile__bar profile-bar">
         <ProfilePerson />
         <div className="profile-bar__filter">
            {
               profile.data.maxCardsCount > 1 && <PacksCountFilter
                  onMouseDown={() => { }}
                  onTouchEnd={() => { }}
                  onChange={onChangeFilterHandler}
                  min={profile.data.minCardsCount}
                  max={profile.data.maxCardsCount}
                  values={[
                     values.min,
                     values.max
                  ]} />
            }
         </div>
      </div>
   )
}