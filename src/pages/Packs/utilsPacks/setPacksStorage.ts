export const setPacksStorage = (params: ParamsType) => {
    const dataAsString = localStorage.getItem('packs')
    if (dataAsString !== null) {
        const data = JSON.parse(dataAsString)
        localStorage.setItem('packs', JSON.stringify({ packs: { ...data.packs, ...params } }))
    } else {
        localStorage.setItem('packs', JSON.stringify({ packs: { ...params } }))
    }
}
export const clearPacksStorage = (params: string[]) => {
    const dataAsString = localStorage.getItem('packs')
    if (dataAsString !== null) {
        const data = JSON.parse(dataAsString)
        params.forEach(p => {
            delete data.packs[p]
        })
        localStorage.setItem('packs', JSON.stringify(data))
    }
}
type ParamsType = {
    [key: string]: number | string
}