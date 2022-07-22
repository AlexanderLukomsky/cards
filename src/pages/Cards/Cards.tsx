import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { CardsType } from "../../api/cards-api"
import { formatDate } from "../../utils/formatDate";
import './cards.scss';
export const Cards = ({ cards, isInitialized, ...props }: any) => {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className='cards'>
            <h3 className="cards__title">Packs list</h3>
            <TableContainer className="packs__table" component={Paper}>
                <Table sx={{ maxWidth: 1200 }} aria-label="simple table" >
                    <TableHead className="cards__head head">
                        <TableRow>
                            <TableCell className="head__title" size="medium">Question</TableCell>
                            <TableCell className="head__title" align="right" >Answer</TableCell>
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
                                    {cards.map((c: CardsType) => (
                                        <TableRow
                                            key={c._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {c.question}
                                            </TableCell>
                                            <TableCell align="center">{c.answer}</TableCell>
                                            <TableCell align="right">{formatDate(c.updated)}</TableCell>
                                            <TableCell align="center">{c.grade}</TableCell>
                                        </TableRow>
                                    ))}
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
}