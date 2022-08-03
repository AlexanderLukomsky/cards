import { CircularProgress, Paper, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { CardsType } from "../../api/cards-api"
import { _instance } from "../../api/instance";
import { useAppSelector } from "../../store/store";
import { formatDate } from "../../utils/formatDate";
import { AddCardModal } from "./cardsModal/addCardModal";
import './stylesCards/cards.scss';
export const Cards: React.FC<PropsType> = ({ cards, isInitialized, packUserId, packId, ...props }) => {
    const authId = useAppSelector(state => state.auth._id)
    const status = useAppSelector(state => state.cards.updateStatus.status)
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className='cards'>
            <div className="cards__header">
                <h3 className="cards__title">Cards list</h3>
                {(packUserId === authId && isInitialized) && <AddCardModal packId={packId} />}
            </div>
            <TableContainer className="packs__table" component={Paper}>
                <Table sx={{ maxWidth: 1200 }} aria-label="simple table" >
                    <TableHead className="cards__head head">
                        <TableRow>
                            <TableCell className="head__title" align="left">Question</TableCell>
                            <TableCell className="head__title" align="center" >Answer</TableCell>
                            <TableCell className="head__title" align="right">Last Updated</TableCell>
                            <TableCell className="head__title" align="center">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            !isInitialized ?
                                <TableRow style={{ width: '100%', position: 'relative', height: '150px' }}>
                                    <TableCell
                                        style={{
                                            color: 'transparent',
                                            position: 'absolute', top: '50%', left: '50%',
                                            transform: 'translate(-50%,-50%)',
                                            border: 'none'
                                        }}>
                                        <CircularProgress color="primary" size="50px" />
                                    </TableCell>
                                </TableRow> :
                                <>
                                    {
                                        status === 'loading' ?
                                            <tr style={{ position: 'relative', height: '100px' }}>
                                                <td style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateY(-50%)' }}>
                                                    <CircularProgress />
                                                </td>
                                            </tr>
                                            :
                                            <>
                                                {cards.map((c: CardsType) => (
                                                    <TableRow onClick={() => {
                                                        _instance.put('cards/grade', { grade: 5, card_id: c._id })
                                                    }}
                                                        key={c._id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="left" component="th" scope="table">{c.question}</TableCell>
                                                        <TableCell align="center">{c.answer}</TableCell>
                                                        <TableCell align="right">{formatDate(c.updated)}</TableCell>
                                                        <TableCell align="center">
                                                            <Rating size="small" name="half-rating-read" defaultValue={c.grade} precision={0.1} readOnly />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                    }
                                </>
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
type PropsType = {
    isInitialized: boolean
    cards: CardsType[]
    packId: string
    packUserId: string
}