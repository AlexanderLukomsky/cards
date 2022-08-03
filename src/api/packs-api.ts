import { _instance } from "./instance"

export const packsAPI = {
    getPacks(requestParams?: RequestType) {
        return _instance.get<PacksDataType>('/cards/pack', {
            params: requestParams
        })
    },
    createPack(name: string) { return _instance.post('/cards/pack', { cardsPack: { name } }) },
    deletePack(id: string) { return _instance.delete(`/cards/pack?id=${id}`) },
    editPackName({ _id, name }: { _id: string, name: string }) {
        return _instance.put(`/cards/pack`, { cardsPack: { _id, name } })
    }
}
export type PacksDataType = {
    cardPacks: PacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type PacksType = {
    cardsCount: number
    created: string
    deckCover: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    updated: Date
    user_id: string
    user_name: string
    __v: number
    _id: string
}
type RequestType = {
    pageCount?: number
    page?: number
    min?: number
    max?: number
    user_id?: string | null,
    packName?: string | null
}