import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { _instance } from "../../api/instance"
import moment from 'moment'

export const Cards = () => {
    const [cards, setCards] = useState<any[]>([])
    const getCards = () => {
        return _instance.get('/cards/pack')
    }
    useEffect(() => {
        getCards()
            .then(res => {
                setCards(res.data.cardPacks)
            })

    }, [])
    const formatDate = (date: Date) => {
        return moment(date).format("DD.MM.YYYY")
    }
    console.log();
    return (
        <div style={{ maxWidth: '670px', margin: '0 auto' }}>
            <TableContainer component={Paper}>
                <Table sx={{ maxWidth: 670 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Cards</TableCell>
                            <TableCell align="center">Last Updated</TableCell>
                            <TableCell align="left">Created by</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((c) => (
                            <TableRow
                                key={c._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {c.name}
                                </TableCell>
                                <TableCell align="right">{c.cardsCount}</TableCell>
                                <TableCell align="right">{formatDate(c.updated)}</TableCell>
                                <TableCell align="center">{c.user_name}</TableCell>
                                <TableCell align="right">
                                    <button>Delete</button>
                                    <button>Edit</button>
                                    <button>Learn</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}