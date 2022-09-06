import { Paper, Table, TableContainer } from "@mui/material"
import { CardsType } from "../../../api/cards-api"
import { TableHeadContainer } from "../../../Components/Table/TableHeadContainer/TableHeadContainer"
import { CardsListContainer } from "./CardsListContainer/CardsListContainer"

export const CardsList: React.FC<PropsType> = ({ cards }) => {
   const columns = [{ title: 'Question', align: 'left' }, { title: 'Answer', align: 'center' }, { title: 'Last Updated', align: 'right' }, { title: 'Grade', align: 'center' }] as { title: string, align: "inherit" | "left" | "center" | "right" | "justify" | undefined }[]
   return (
      <div>
         <TableContainer component={Paper}>
            <Table aria-label="simple table" >
               <TableHeadContainer columns={columns} />
               <CardsListContainer cards={cards} />
            </Table>
         </TableContainer>
      </div>

   )
}
type PropsType = {
   cards: CardsType[]
}