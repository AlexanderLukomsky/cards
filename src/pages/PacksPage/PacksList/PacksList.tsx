import { Paper, Table, TableContainer } from "@mui/material";
import React from "react"
import { PacksType } from "../../../api/packs-api";
import { AppCircularProgress } from "../../../Components/AppCircularProgress/AppCircularProgress";
import { TableBodyContainer } from "../../../Components/Table/TableBodyContainer/TableBodyContainer";
import { TableHeadContainer } from "../../../Components/Table/TableHeadContainer/TableHeadContainer";
import { useAppSelector } from "../../../store/store";
export const PacksList: React.FC<PropsType> = React.memo(({ packs }) => {
   const columns = [{ title: 'Name', align: 'left' }, { title: 'Cards', align: 'right' }, { title: 'Last Updated', align: 'right' }, { title: 'Created by', align: 'center' }, { title: 'Actions', align: 'left' }] as { title: string, align: "inherit" | "left" | "center" | "right" | "justify" | undefined }[]
   const packsStatus = useAppSelector(state => state.packs.packsStatus)
   return (
      <div className="packs-list">
         {packsStatus === 'loading' && <AppCircularProgress />}
         <TableContainer component={Paper}>
            <Table aria-label="simple table" >
               <TableHeadContainer columns={columns} />
               <TableBodyContainer packs={packs} />
            </Table>
         </TableContainer>
      </div>
   )
})
type PropsType = {
   packs: PacksType[]
}