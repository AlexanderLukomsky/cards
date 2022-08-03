import { Cards } from "./Cards"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getCardsTC, setInitializedAC } from "./cardsReducer/cardsReducer";
import { Header } from "../../Components/Header/Header";
import './styleCards/cardsPage.scss'
export const CardsPage = () => {
    const { packId } = useParams<{ packId: string }>()
    const dispach = useAppDispatch()
    const cards = useAppSelector(state => state.cards)
    const navigate = useNavigate()
    useEffect(() => {
        if (!packId) { navigate('/404'); return }
        dispach(getCardsTC(packId))
        return () => {
            dispach(setInitializedAC(false))
        }
    }, [dispach, packId])
    return (
        <div className="cards_page container">
            <Header page='cards' />
            <div className="cards_page__container">
                <Cards
                    cards={cards.data.cards}
                    isInitialized={cards.isInitialized}
                    packId={packId as string}
                    packUserId={cards.data.packUserId}
                />
            </div>
        </div>
    )
}