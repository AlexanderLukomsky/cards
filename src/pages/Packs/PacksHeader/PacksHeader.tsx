import { _instance } from "../../../api/instance"
import { getPacksTC } from "../../../store/reducers/packsReducer"
import { useAppDispatch } from "../../../store/store"

export const PacksHeader = () => {
    const dispatch = useAppDispatch()
    return (
        <div>
            <div>

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