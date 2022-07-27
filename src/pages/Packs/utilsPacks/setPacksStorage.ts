export const setPacksStorage = (params: ParamsType) => {
    const dataAsString = localStorage.getItem('packs')
    if (dataAsString !== null) {
        const data = JSON.parse(dataAsString)
        localStorage.setItem('packs', JSON.stringify({ packs: { ...data.packs, ...params } }))
    } else {
        localStorage.setItem('packs', JSON.stringify({ packs: { ...params } }))
    }
}
type ParamsType = {
    [key: string]: number | string
}