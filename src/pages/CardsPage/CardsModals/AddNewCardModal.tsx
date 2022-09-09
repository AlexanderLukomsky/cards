import { Button, TextField } from "@mui/material"
import React, { ChangeEvent, useState } from "react"
import { cardsAPI } from "../../../api/cards-api"
import { AppCircularProgress } from "../../../Components/AppCircularProgress/AppCircularProgress"
import { ModalContainer } from "../../../Components/ModalContainer/ModalContainer"
import { useAppDispatch, useAppSelector } from "../../../store/store"
import { addNewCard } from "../reducer/cardsReducer"

export const AddNewCardModal: React.FC<PropsType> = React.memo(({ cardsPack_id }) => {
   const { packsStatus } = useAppSelector(state => state.packs)
   const dispatch = useAppDispatch()
   const [openModal, setOpenModal] = useState(false)
   const [question, setQuestion] = useState('')
   const [answer, setAnswer] = useState('')
   const [errors, setError] = useState({
      questionError: '',
      answernError: ''
   })
   const onOpenModal = () => {
      setOpenModal(true)
   }
   const onCloseModal = () => {
      setQuestion('')
      setAnswer('')
      setError({ questionError: '', answernError: '' })
      setOpenModal(false)
   }
   const onAddNewCard = async () => {
      if (question.trim() === '') {
         setError(err => ({ ...err, questionError: 'enter question' }))
         return
      } else if (answer.trim() === '') {
         setError(err => ({ ...err, answernError: 'enter answer' }))
         return
      }
      if (question.trim().length > 30) {
         setError(err => ({ ...err, questionError: 'maximum question length 30' }))
         return
      } else if (answer.trim().length > 30) {
         setError(err => ({ ...err, answernError: 'maximum answer length 30' }))
         return
      }
      const action = await dispatch(addNewCard({ question, answer, cardsPack_id }))
      if (!addNewCard.rejected.match(action)) {
         onCloseModal()
      }
   }
   const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError(err => ({ ...err, questionError: '' }))
      setQuestion(e.currentTarget.value)
   }
   const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setError(err => ({ ...err, answernError: '' }))
      setAnswer(e.currentTarget.value)
   }
   return <>
      <Button variant="contained" color="secondary" onClick={onOpenModal}>Add new card</Button>
      {
         openModal && <ModalContainer
            isOpenModal={openModal}
            onClose={onCloseModal}
            title='Card Info'
            firstBtnProps={{ title: 'Cancel', onClick: onCloseModal }}
            secondBtnProps={{ title: 'Save', onClick: onAddNewCard, disabled: packsStatus === 'loading' }}
         >
            {packsStatus === 'loading' && <AppCircularProgress />}
            <TextField variant="standard" className={errors.questionError ? 'error' : ''}
               label={`${errors.questionError ? errors.questionError : 'Question'}`}
               value={question} onChange={onChangeQuestionHandler}
            />
            <TextField variant="standard" className={errors.answernError ? 'error' : ''}
               label={`${errors.answernError ? errors.answernError : 'Answer'}`}
               value={answer} onChange={onChangeAnswerHandler}
            />
         </ModalContainer>
      }
   </>
})
type PropsType = {
   cardsPack_id: string
}