import { ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { ListTitle } from "../../Components/ListTitle/ListTitle";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Header } from "../Header/Header";
import { _pagesPath } from "../Routes/_path/pagesPath";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./cardsPage.scss"
import { getCards, searchCards, setCardsPage, setSearchCardsName, setPageCount } from "./reducer/cardsReducer";
import { IconButton } from "@mui/material";
import { CardsList } from "./CardsList/CardsList";
import { AppCircularProgress } from "../../Components/AppCircularProgress/AppCircularProgress";
import { AddNewCardModal } from "./CardsModals/AddNewCardModal";
import { PacksPagination } from "../PacksPage/Packs/PacksPagination/PaginationPacks";
import { PacksSearch } from "../PacksPage/Packs/PacksSearch/PacksSearch";
import { CustomSelect } from "../../Components/CustomSelect/CustomSelect";
export const CardsPage = () => {
   const dispatch = useAppDispatch()
   const { packId } = useParams<{ packId: string }>()
   const { auth } = useAppSelector(state => state)
   const { cards } = useAppSelector(state => state)
   const navigate = useNavigate()
   useEffect(() => {
      if (!auth.isAuth) {
         navigate(_pagesPath.MAIN)
         return
      }
      return () => {
         dispatch(setSearchCardsName({ searchCardsName: null }))
      }
   }, [navigate, auth.isAuth, dispatch])
   useEffect(() => {
      if (packId) {
         if (!cards.searchCardsName) {
            dispatch(getCards(packId))
            return
         }
         dispatch(searchCards(packId))
      }
   }, [cards.updateCards, cards.data.page, cards.searchCardsName, dispatch, packId, cards.data.pageCount])
   const onClickBackHandler = () => { navigate(-1) }
   const onChangePage = (e: ChangeEvent<unknown>, page: number) => { dispatch(setCardsPage({ page })) }
   const onSearchCardName = (searchCardsName: string) => {
      if (searchCardsName.trim() === '') {
         dispatch(setSearchCardsName({ searchCardsName: null }))
         return
      }
      dispatch(setSearchCardsName({ searchCardsName: searchCardsName.trim() }))
   }
   const onPageCountHandler = (value: number) => {
      dispatch(setPageCount({ pageCount: value }))
   }
   return (
      <div className="cards-page">
         <div className="container">
            <Header />
            <div className="cards-page__cards cards">
               {cards.cardsStatus === 'loading' && <AppCircularProgress />}
               {cards.isInitialized && <>
                  <div className="cards__title-box">
                     <IconButton onClick={onClickBackHandler}><ArrowBackIcon /></IconButton>
                     <ListTitle title={cards.data.packName} />
                  </div>
                  <div className="cards__header">
                     <PacksSearch onSearchPacks={onSearchCardName} />
                     {(auth.authData._id === cards.data.packUserId) && <AddNewCardModal cardsPack_id={packId!} />}
                  </div>
                  <CardsList cards={cards.data.cards} />
                  {!cards.searchCardsName &&
                     <div className="cards__footer">
                        <PacksPagination
                           page={cards.data.page}
                           totalCount={cards.data.cardsTotalCount === 0 ? 5 : cards.data.cardsTotalCount}
                           pageCount={cards.data.pageCount}
                           onChange={onChangePage}
                        />
                        <CustomSelect items={[5, 10, 15]} value={cards.data.pageCount} onChange={onPageCountHandler} />
                     </div>
                  }
               </>
               }
            </div>
         </div>
      </div>
   )
}