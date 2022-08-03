import { Button, IconButton, TextField } from "@mui/material"
import React, { useState } from "react"
import { BasicModal } from "../../../Components/Modals/BasicModal"
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from "../../../store/store";
import { addCardTC } from "../cardsReducer/cardsReducer";
export const AddCardModal: React.FC<{ packId: string }> = React.memo(({ packId }) => {
    const dispatch = useAppDispatch()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const closeHandler = () => { setIsOpenModal(false) }
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState('')
    const addCardHandler = () => {
        if (question.trim() === '') {
            setError('incorrect question')
            return
        }
        if (answer.trim() === '') {
            setError('incorrect answer')
            return
        }
        dispatch(addCardTC({ question: question.trim(), answer: answer.trim(), cardsPack_id: packId }))
        setIsOpenModal(false)
    }
    const onChangeQuestionHandler = (value: string) => {
        setError('')
        setQuestion(value)
    }
    const onChangeAnswerHandler = (value: string) => {
        setError('')
        setAnswer(value)
    }
    return (
        <>
            <Button size="large" onClick={() => { setIsOpenModal(true) }} style={{ lineHeight: '0' }}>
                ADD CARD  <AddIcon fontSize="small" />
            </Button>
            <BasicModal setIsOpenModal={setIsOpenModal} isOpenModal={isOpenModal} title="Card Info">
                <div className="add-modal__body">
                    <div style={{ marginBottom: '10px' }}>
                        <TextField variant="standard" fullWidth label={error ? error : "Question"} value={question}
                            onChange={(e) => { onChangeQuestionHandler(e.currentTarget.value) }}
                        />
                    </div>
                    <div>
                        <TextField variant="standard" fullWidth label={error ? error : "Answer"} value={answer}
                            onChange={(e) => { onChangeAnswerHandler(e.currentTarget.value) }}
                        />
                    </div>
                </div>
                <div className="basic-modal__buttons">
                    <Button variant="contained" color="primary" onClick={closeHandler}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={addCardHandler}>Add</Button>
                </div>
            </BasicModal>
        </>

    )
})
type PropsType = {
    packName: string
    id: string
}