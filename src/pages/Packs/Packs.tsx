import { TableCell, TableRow } from "@mui/material"
import './stylesPacks/packs.scss'
import React from "react"
import { PacksType } from "../../api/packs-api"
import { TableWrapper } from "../Table_Components/TableContainer"
import { PacksBody } from "./PacksBody/PacksBody"
export const Packs: React.FC<PropsType> = React.memo(({ packs, isInitialized }) => {
   return (
      <div className="packs">
         <h3 className="packs__title">Packs list</h3>
         <TableWrapper
            className="packs"
            tableheadRow={
               <TableRow>
                  <TableCell className="head__title" size="medium">Name</TableCell>
                  <TableCell className="head__title" align="right" >Cards</TableCell>
                  <TableCell className="head__title" align="right">Last Updated</TableCell>
                  <TableCell className="head__title" align="center">Created by</TableCell>
                  <TableCell className="head__title" align="left">Actions</TableCell>
               </TableRow>
            }
            tableBody={
               <PacksBody packs={packs} isInitialized={isInitialized} />
            }
         />
      </div>
   )
}
)
type PropsType = {
   packs: PacksType[]
   isInitialized: boolean
}