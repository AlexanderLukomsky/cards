import { _instance } from "./instance"

export const cardsAPI = {
   getCards(requestParams: RequestParamsType) {
      return _instance.get<CardsResponeDataType>(`/cards/card?cardsPack`, {
         params: requestParams
      })
   },
   addCard(model: AddCardModelType) {
      return _instance.post('cards/card', { card: model })
   },
   setGrade(params: { grade: number, card_id: string }) {
      return _instance.put('cards/grade', params)
   }
}
export type CardsResponeDataType = {
   cards: CardsType[]
   packUserId: string
   page: number
   pageCount: number
   cardsTotalCount: number
   minGrade: number
   maxGrade: number
   token: string
   tokenDeathTime: Date
   packName: string
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
   type: string,
   rating: number,
   more_id: string,
   created: Date,
   updated: Date,
   __v: number
}
export type RequestParamsType = {
   cardsPack_id: string
   page: number
   pageCount: number
   cardAnswer?: string | null
   cardQuestion?: string | null
}
export type AddCardModelType = { question: string, answer: string, cardsPack_id: string }