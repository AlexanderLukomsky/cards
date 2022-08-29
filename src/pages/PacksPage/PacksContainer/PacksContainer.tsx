import { ChangeEvent } from "react"
import { PacksType } from "../../../api/packs-api"
import { AppCircularProgress } from "../../../Components/AppCircularProgress/AppCircularProgress"
import { PacksList } from "../PacksList/PacksList"
import { PacksSearch } from "../PacksSearch/PacksSearch"
import { PaginationPacks } from "../PaginationPacks/PaginationPacks"
import "./packsContainer.scss"
export const PacksContainer: React.FC<PropsType> = (
   { packs, onChangePage, title, page, isInitialized, pageCount, cardPacksTotalCount, setSearchValue }
) => {
   return (
      <div className="packs-container">
         <h3 className="packs-container__title">{title}</h3>
         <PacksSearch setSearchValue={setSearchValue} />
         {!isInitialized ? <AppCircularProgress /> : <PacksList packs={packs} />}
         <div className="packs-container__navigation">
            <PaginationPacks onChange={onChangePage} page={page} pageCount={pageCount} cardPacksTotalCount={cardPacksTotalCount} />
         </div>
      </div>
   )
}
type PropsType = {
   packs: PacksType[]
   title: string
   onChangePage: (e: ChangeEvent<unknown>, page: number) => void
   page: number
   isInitialized: boolean
   pageCount: number
   cardPacksTotalCount: number
   setSearchValue: (value: string) => void
}