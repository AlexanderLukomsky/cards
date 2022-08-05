import { TableCell, TableRow } from "@mui/material";
import { _instance } from "../../api/instance";
import { useAppSelector } from "../../store/store";
import { TableWrapper } from "../Table_Components/TableContainer";
import { CardsBody } from "./CardsBody/CardsBody";
import { AddCardModal } from "./cardsModal/addCardModal";
export const Cards: React.FC<PropsType> = ({ packId }) => {
  const authId = useAppSelector(state => state.auth.authData._id)
  const cards = useAppSelector(state => state.cards)
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }} className='cards'>
      <div className="cards__header">
        <h3 className="cards__title">Cards list</h3>
        {(cards.data.packUserId === authId && cards.isInitialized) && <AddCardModal packId={packId} />}
      </div>
      <TableWrapper className="cards"
        tableheadRow={
          <TableRow>
            <TableCell className="head__title" align="left">Question</TableCell>
            <TableCell className="head__title" align="center" >Answer</TableCell>
            <TableCell className="head__title" align="right">Last Updated</TableCell>
            <TableCell className="head__title" align="center">Grade</TableCell>
          </TableRow>
        }
        tableBody={
          <CardsBody
            cards={cards.data.cards}
            isInitialized={cards.isInitialized}
            updateStatus={cards.updateStatus.status}
          />
        }
      />
    </div>
  )
}
type PropsType = {
  packId: string
}