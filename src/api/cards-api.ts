import { _instance } from './instance';
export const cardsAPI = {
    getCards(id: string) {
        return _instance.get<CardsResponeDataType>(`/cards/card?cardsPack_id=${id}&pageCount=15`)
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

export type CardsType = {
    _id: string,
    cardsPack_id: string,
    user_id: string,
    answer: string,
    question: string,
    grade: number,
    shots: number,
    comments: string,
    type: "card",
    rating: number,
    more_id: string,
    created: Date,
    updated: Date,
    __v: number
}
