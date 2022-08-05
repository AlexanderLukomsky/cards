import { Rating, TableBody, TableCell, TableRow } from "@mui/material"
import { CardsType } from "../../../api/cards-api"
import { formatDate } from "../../../utils/formatDate"
import { StatusType } from "../../../_types/types"
import { TableRowProgress } from "../../Table_Components/TableRowProgress"

export const CardsBody: React.FC<PropsType> = ({ isInitialized, cards, updateStatus }) => {
	return (
		<TableBody>
			{
				!isInitialized || updateStatus === 'loading' ? <TableRowProgress /> :
					<>
						{
							<>
								{cards.map((c: CardsType) => (
									<TableRow className="cards__row"
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
	)
}

type PropsType = {
	isInitialized: boolean
	cards: CardsType[]
	updateStatus: StatusType
}