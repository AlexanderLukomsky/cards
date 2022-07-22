import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import moment from 'moment'
import './packs.scss'
import { MouseEvent } from "react"
import { useNavigate } from "react-router-dom"
import { PacksType } from "../../api/packs-api"
export const Packs = ({ packs, isInitialized, ...props }: PropsType) => {
    const navigate = useNavigate()
    const formatDate = (date: Date) => {
        return moment(date).format("DD.MM.YYYY")
    }
    const goToCard = (e: MouseEvent<HTMLTableRowElement>, id: string) => {
        if ((e.target as Element).tagName !== 'BUTTON') {
            navigate(`/cards/${id}`)
        }
    }
    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }} className='packs'>
            <h3 className="packs__title">Packs list</h3>
            <TableContainer className="packs__table" component={Paper}>
                <Table sx={{ maxWidth: 960 }} aria-label="simple table" >
                    <TableHead className="packs__head head">
                        <TableRow>
                            <TableCell className="head__title" size="medium">Name</TableCell>
                            <TableCell className="head__title" align="right" >Cards</TableCell>
                            <TableCell className="head__title" align="right">Last Updated</TableCell>
                            <TableCell className="head__title" align="center">Created by</TableCell>
                            <TableCell className="head__title" align="left">Actions</TableCell>
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
                                    {packs.map((p) => (
                                        <TableRow onDoubleClick={(e) => goToCard(e, p._id)}
                                            key={p._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">

                                                {p.name}
                                            </TableCell>
                                            <TableCell align="center">{p.cardsCount}</TableCell>
                                            <TableCell align="right">{formatDate(p.updated)}</TableCell>
                                            <TableCell align="center">{p.user_name}</TableCell>
                                            <TableCell align="right">
                                                <div>
                                                    <button>Delete</button>
                                                    <button>Edit</button>
                                                    <button>Learn</button>
                                                </div>
                                            </TableCell>
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
    packs: PacksType[]
    isInitialized: boolean
}