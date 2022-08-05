import { Paper, Table, TableContainer, TableHead, } from "@mui/material";
export const TableWrapper: React.FC<PropsType> = ({
	className, tableheadRow, tableBody
}) => {
	return (
		<TableContainer
			className={`${className}__container`}
			component={Paper}>
			<Table className={`${className}__table`} sx={{ maxWidth: 1200 }} aria-label="simple table" >
				<TableHead className={`${className}__head head`}>
					{tableheadRow}
				</TableHead>
				{tableBody}
			</Table>
		</TableContainer>
	)
}
type PropsType = {
	className: string
	tableheadRow: React.ReactNode
	tableBody: React.ReactNode
}