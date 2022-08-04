import { SortPackCards } from "../SortPackCards/SortPacksCards"
import { PacksBarHeader } from "./PacksBarHeader/PacksBarHeader"

export const PacksBar = () => {
    return (
        <div className='packs_page__bar'>
            <div className='packs_page__bar-header'>
                <PacksBarHeader />
            </div>
            <div className='slider-wrapper'>
                <SortPackCards />
            </div>
        </div>
    )
}