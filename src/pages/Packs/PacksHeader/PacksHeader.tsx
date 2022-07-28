import { useEffect, useState } from "react"
import { _instance } from "../../../api/instance"
import { getPacksTC } from "../../../store/reducers/packsReducer"
import { useAppDispatch } from "../../../store/store"

export const PacksHeader = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState<string>('')
    // useEffect(() => {
    //     if (!value) { return }
    //     const id = setTimeout(() => {
    //         _instance.get(`/cards/pack?packName=${value}`)
    //             .then(e => {
    //                 console.log(e.data);
    //             })
    //     }, 1000)
    //     return () => clearTimeout(id)
    // }, [value])
    const onChange = (text: string) => {
        setValue(text)
    }
    return (
        <div>
            <div>
                <input type="text" value={value} onChange={(e) => {
                    onChange(e.currentTarget.value)
                }} />
            </div>
            <div>
                <button onClick={() => {
                    //  _instance.delete('/cards/pack?id=62dffecbe72dee3114c2b03f').then(() => { dispatch(getPacksTC()) })
                    _instance.post('/cards/pack', {
                        cardsPack: {
                            name: "privet pipli"
                        }
                    }).then(() => { dispatch(getPacksTC()) })

                }}>ADD NEW</button>
            </div>
        </div>
    )
}