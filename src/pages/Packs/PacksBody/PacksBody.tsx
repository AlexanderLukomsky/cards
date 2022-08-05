import { IconButton, TableBody, TableCell, TableRow } from "@mui/material"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../store/store"
import { DeletePackModal } from "../PacksModals/DeletePackModal"
import { EditPackNameModal } from "../PacksModals/EditPackNameModal"
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { TableRowProgress } from "../../Table_Components/TableRowProgress"
import { PacksType } from "../../../api/packs-api"
export const PacksBody: React.FC<PropsType> = ({ isInitialized, packs }) => {
   const userId = useAppSelector(state => state.auth.authData._id)
   const navigate = useNavigate()
   const formatDate = (date: Date) => {
      return moment(date).format("DD.MM.YYYY")
   }
   const onClickNavigateHandler = (pack_id: string) => {
      navigate(`/cards/${pack_id}`)
   }
   return (
      <TableBody>
         {
            !isInitialized ? <TableRowProgress /> :
               <>
                  {packs.map((p) => (
                     <TableRow
                        className={'packs__row'}
                        key={p._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell
                           className="packs__name"
                           component="th"
                           scope="row"
                           onClick={() => onClickNavigateHandler(p._id)}>
                           {p.name}
                        </TableCell>
                        <TableCell align="center">{p.cardsCount}</TableCell>
                        <TableCell align="right">{formatDate(p.updated)}</TableCell>
                        <TableCell align="center">{p.user_name}</TableCell>
                        <TableCell align="right">
                           {userId === p.user_id ?
                              <div>
                                 <DeletePackModal packName={p.name} id={p._id} />
                                 <EditPackNameModal id={p._id} packName={p.name} />
                                 <IconButton onClick={() => { onClickNavigateHandler(p._id) }}><FolderOpenIcon /></IconButton>
                              </div>
                              :
                              <div>
                                 <IconButton onClick={() => { onClickNavigateHandler(p._id) }}><FolderOpenIcon /></IconButton>
                              </div>
                           }
                        </TableCell>
                     </TableRow>
                  ))}
               </>
         }
      </TableBody>
   )
}
type PropsType = {
   packs: PacksType[]
   isInitialized: boolean
}