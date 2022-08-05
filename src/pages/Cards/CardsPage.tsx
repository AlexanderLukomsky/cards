import { Cards } from "./Cards"
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../../store/store";
import { getCardsTC, setInitializedAC } from "./cardsReducer/cardsReducer";
import { Header } from "../../Components/Header/Header";
import './stylesCards/cards.scss';
export const CardsPage = () => {
  const { packId } = useParams<{ packId: string }>()
  const dispach = useAppDispatch()
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
          packId={packId as string}
        />
      </div>
    </div>
  )
}