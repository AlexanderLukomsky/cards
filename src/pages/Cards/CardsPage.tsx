import { Cards } from "./Cards"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getCardsTC, setInitializedAC } from "../../store/reducers/cardsReducer";
import { Header } from "../../Components/Header/Header";
import './cardsPage.scss'
export const CardsPage = () => {
    const { packId } = useParams<{ packId: string }>()
    const dispach = useAppDispatch()
    const cards = useAppSelector(state => state.cards.data.cards)
    const isInitialized = useAppSelector(state => state.cards.isInitialized)
    useEffect(() => {
        if (!packId) { return }
        dispach(getCardsTC(packId))
        return () => {
            dispach(setInitializedAC(false))
        }
    }, [dispach, packId])
    return (
        <div className="cards_page container">
            <Header page='cards' />
            <div className="cards_page__container">
                <Cards cards={cards} isInitialized={isInitialized} />
            </div>
        </div>
    )
}