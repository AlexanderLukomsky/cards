import { _instance } from './instance';
export const cardsAPI = {
    getCards(id: string) {
        return _instance.get<CardsResponeDataType>(`/cards/card?cardsPack_id=${id}&pageCount=15`)
    },
    addCard(model: AddCardModelType) {
        return _instance.post<{ newCard: AddCardResType }>('cards/card', { card: model })
    }
}
export type CardsResponeDataType = {
    cards: CardsType[]
    packUserId: string,
    page: number,
    pageCount: number,
    cardsTotalCount: number,
    minGrade: number,
    maxGrade: number,
    token: string,
    tokenDeathTime: Date
}
export type AddCardModelType = { question: string, answer: string, cardsPack_id: string }
export type CardsType = {
    _id: string,
    cardsPack_id: string,
    user_id: string,
    answer: string,
    question: string,
    grade: number,
    shots: number,
    comments: string,
    type: string,
    rating: number,
    more_id: string,
    created: Date,
    updated: Date,
    __v: number
}

type AddCardResType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: Date
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: Date
    user_id: string
    __v: number
    _id: string
}