import { CircularProgress, TableCell, TableRow } from "@mui/material"

export const TableRowProgress = () => {
    return (
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
        </TableRow>
    )
}