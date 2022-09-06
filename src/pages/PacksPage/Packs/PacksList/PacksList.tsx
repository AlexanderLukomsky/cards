import { Paper, Table, TableContainer } from "@mui/material";
import React from "react"
import { PacksType } from "../../../../api/packs-api";
import { AppCircularProgress } from "../../../../Components/AppCircularProgress/AppCircularProgress";
import { TableHeadContainer } from "../../../../Components/Table/TableHeadContainer/TableHeadContainer";
import { StatusType } from "../../../../types/types";
import { PacksListContainer } from "./PacksListContainer/PacksListContainer";
export const PacksList: React.FC<PropsType> = React.memo(({ packs, progressStatus }) => {
   const columns = [{ title: 'Name', align: 'left' }, { title: 'Cards', align: 'right' }, { title: 'Last Updated', align: 'right' }, { title: 'Created by', align: 'center' }, { title: 'Actions', align: 'center' }] as { title: string, align: "inherit" | "left" | "center" | "right" | "justify" | undefined }[]
   return (
      <div className="packs__list packs-list">
         {progressStatus === 'loading' && <AppCircularProgress />}
         <TableContainer component={Paper}>
            <Table aria-label="simple table" >
               <TableHeadContainer columns={columns} />
               <PacksListContainer packs={packs} />
            </Table>
         </TableContainer>
      </div>
   )
})
type PropsType = {
   packs: PacksType[]
   progressStatus: StatusType
}