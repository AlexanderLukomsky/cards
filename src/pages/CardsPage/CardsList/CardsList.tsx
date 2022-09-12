import { Paper, Table, TableContainer } from "@mui/material"
import { CardsType } from "../../../api/cards-api"
import { TableHeadContainer } from "../../../Components/Table/TableHeadContainer/TableHeadContainer"
import { CardsListContainer } from "./CardsListContainer/CardsListContainer"
import "./cardsList.scss"
export const CardsList: React.FC<PropsType> = ({ cards }) => {
   const columns = [{ title: 'Question', align: 'center' }, { title: 'Answer', align: 'center' }, { title: 'Last Updated', align: 'center' }, { title: 'Grade', align: 'center' }] as { title: string, align: "inherit" | "left" | "center" | "right" | "justify" | undefined }[]
   return (
      <div className="cards-list">
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