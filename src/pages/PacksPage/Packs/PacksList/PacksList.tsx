import { Paper, Table, TableContainer } from "@mui/material";
import React, { useState } from "react"
import { PacksType } from "../../../../api/packs-api";
import { AppCircularProgress } from "../../../../Components/AppCircularProgress/AppCircularProgress";
import { TableHeadContainer } from "../../../../Components/Table/TableHeadContainer/TableHeadContainer";
import { StatusType } from "../../../../commonTypes/types";
import { PacksCardsTrainingModal } from "../PacksModals/PacksCardsTrainingModal/PacksCardsTrainingModal";
import { PacksListContainer } from "./PacksListContainer/PacksListContainer";
export const PacksList: React.FC<PropsType> = React.memo(({ packs, progressStatus }) => {
   const [isOpenTrainingModal, setIsOpenTrainingModal] = useState(false)
   const columns = [{ title: 'Name', align: 'left' }, { title: 'Cards', align: 'right' }, { title: 'Last Updated', align: 'right' }, { title: 'Created by', align: 'center' }, { title: 'Actions', align: 'center' }] as { title: string, align: "inherit" | "left" | "center" | "right" | "justify" | undefined }[]
   const openTrainingModal = () => { setIsOpenTrainingModal(true) }
   const onCloseTrainingModal = () => { setIsOpenTrainingModal(false) }
   return (
      <div className="packs__list packs-list">
         {progressStatus === 'loading' && <AppCircularProgress />}
         <TableContainer component={Paper}>
            <Table aria-label="simple table" >
               <TableHeadContainer columns={columns} />
               <PacksListContainer openTrainingModal={openTrainingModal} packs={packs} />
            </Table>
         </TableContainer>
         {isOpenTrainingModal && <PacksCardsTrainingModal onCloseModal={onCloseTrainingModal} isOpen={isOpenTrainingModal} />}
      </div>
   )
})
type PropsType = {
   packs: PacksType[]
   progressStatus: StatusType
}