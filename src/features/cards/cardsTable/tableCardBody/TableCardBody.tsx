import {TableBody, TableCell, TableRow} from "@mui/material";
import {RatingStars} from "../../../../components/RatingStars/RatingStars";
import styles from "../cardsTable.module.scss";
import editIcon from "../../../../assets/icons/packs/edit.svg";
import deleteIcon from "../../../../assets/icons/packs/trash.svg";
import {FC, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/store";
import {deleteCardTC} from "../../cardsReducer";
import {DeleteCardModal} from "../../CardsModals/DeleteCardModal/DeleteCardModal";
import {EditCardModal} from "../../CardsModals/EditCardModal/EditCardModal";

type TableCardBodyType = {
    isOwner: boolean
}
type SelectedCardType = { cardId: string, packId: string, question: string, answer: string, questionImg: string | null }

const formatDate = (dateCard: string) => {
    const date = new Date(dateCard)
    const yyyy = date.getFullYear();
    let mm: any = date.getMonth() + 1;
    let dd: any = date.getDate();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return `${dd}.${mm}.${yyyy}`
}


export const TableCardBody: FC<TableCardBodyType> = ({isOwner}) => {

    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.cards.data.cards)
    const status = useAppSelector(state => state.cards.status)
    //actions
    const [selectedCard, setSelectedCard] = useState<SelectedCardType>({
        cardId: '',
        packId: '',
        question: '',
        answer: '',
        questionImg: null
    })
    //delete card
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
    const openDeleteModal = (data: SelectedCardType) => {
        setSelectedCard(data)
        setIsOpenDeleteModal(true)
    }
    const deleteCardHandler = async () => {
        const action = await dispatch(deleteCardTC({cardId: selectedCard.cardId, packId: selectedCard.packId}))
        if (action) {
            setIsOpenDeleteModal(false)
        }
    }
    //edit card
    const [isOpenEditModal, setIsOpenEditModal] = useState(false)
    const openEditModal = (data: SelectedCardType) => {
        setSelectedCard(data)
        setIsOpenEditModal(true)
    }
    const onChangeQuestionHandler = (value: string) => {
        setSelectedCard(data => ({...data, question: value}))
    }
    const onChangeAnswerHandler = (value: string) => {
        setSelectedCard(data => ({...data, answer: value}))
    }

    return (
        <TableBody>
            {cards.length === 0
                ? <TableRow>
                    <TableCell style={{
                        paddingTop: '20px',
                        height: '50px',
                        display: "flex",
                        justifyContent: 'center',
                        marginLeft: "400px"
                    }}>no cards</TableCell>
                </TableRow>
                : cards.map((card) => (
                    <TableRow
                        key={card._id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}, backgroundColor: 'white'}}
                    >
                        <TableCell component="th" scope="row">
                            {card.questionImg && card.questionImg !== 'url or base 64'
                                ? <img src={card.questionImg} alt={'0'} className={styles.questionImg}/>
                                : card.question
                            }
                        </TableCell>
                        <TableCell align="right">
                            {card.answerImg && card.answerImg !== 'url or base 64'
                                ? <img src={card.answerImg} alt={'0'} className={styles.questionImg}/>
                                : card.answer
                            }
                        </TableCell>
                        <TableCell align="right">
                            {formatDate(card.updated)}
                        </TableCell>
                        <TableCell align="right">
                            <RatingStars stars={card.grade}/>
                        </TableCell>
                        {isOwner &&
                            <TableCell align="right" style={{width: '60px'}}>
                                <div className={styles.toolsIcon}>
                                    <button onClick={() => {
                                        openEditModal(
                                            {
                                                cardId: card._id,
                                                packId: card.cardsPack_id,
                                                question: card.question,
                                                answer: card.answer,
                                                questionImg: card.questionImg
                                            }
                                        )
                                    }}
                                            disabled={status} style={{backgroundColor: 'white'}}
                                    >
                                        <img src={editIcon} alt={'0'} className={styles.Icon}/>
                                    </button>
                                    <button
                                        onClick={() => {
                                            openDeleteModal(
                                                {
                                                    cardId: card._id,
                                                    packId: card.cardsPack_id,
                                                    question: card.question,
                                                    answer: card.answer,
                                                    questionImg: card.questionImg
                                                }
                                            )
                                        }}
                                        disabled={status} style={{backgroundColor: 'white'}}
                                    >
                                        <img src={deleteIcon} alt={'0'} className={styles.Icon}/>
                                    </button>
                                </div>
                            </TableCell>
                        }
                    </TableRow>
                ))}
            <DeleteCardModal
                cardName={selectedCard.question}
                isOpen={isOpenDeleteModal}
                onClose={() => {
                    setIsOpenDeleteModal(false)
                }}
                onDeleteCard={deleteCardHandler}
                isLoading={status}
            />
            <EditCardModal
                questionImg={selectedCard.questionImg}
                question={selectedCard.question}
                answer={selectedCard.answer}
                cardId={selectedCard.cardId}
                packId={selectedCard.packId}
                isLoading={status}
                isOpen={isOpenEditModal}
                onChangeQuestionHandler={onChangeQuestionHandler}
                onChangeAnswerHandler={onChangeAnswerHandler}
                onClosehandler={() => {
                    setIsOpenEditModal(false)
                }}
            />
        </TableBody>
    )
}