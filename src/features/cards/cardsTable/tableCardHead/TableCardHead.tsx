import {TableCell, TableHead, TableRow} from "@mui/material";
import styles from "../cardsTable.module.scss";
import {SortArrows} from "../sortArrows/sortArrows";
import React, {FC, useState} from "react";

type TableCardHeadType={
    packId:string
    isOwner:boolean
}

export const TableCardHead:FC<TableCardHeadType> = ({packId,isOwner})=>{

    const [questionSort, setQuestionSort] = useState(false)
    const [answerSort, setAnswerSort] = useState(false)
    const [updateSort, setUpdateSort] = useState(false)
    const [gradeSort, setGradeSort] = useState(false)

    return(
        <TableHead>
            <TableRow className={styles.tableHeader}>
                <TableCell className={styles.headerTitle}
                           onClick={() => setQuestionSort(true)}
                           onMouseLeave={() => setQuestionSort(false)}>
                    Question
                    {questionSort && <SortArrows packId={packId} value={'question'}/>}
                </TableCell>
                <TableCell className={styles.headerTitle} align="right"
                           onClick={() => setAnswerSort(true)}
                           onMouseLeave={() => setAnswerSort(false)}>
                    Answer
                    {answerSort && <SortArrows packId={packId} value={'answer'}/>}
                </TableCell>
                <TableCell className={styles.headerTitle} align="right"
                           onClick={() => setUpdateSort(true)}
                           onMouseLeave={() => setUpdateSort(false)}>
                    Last Updated
                    {updateSort && <SortArrows packId={packId} value={'updated'}/>}
                </TableCell>
                <TableCell className={styles.headerTitle} align="right"
                           onClick={() => setGradeSort(true)}
                           onMouseLeave={() => setGradeSort(false)}>
                    Grade
                    {gradeSort && <SortArrows packId={packId} value={'grade'}/>}
                </TableCell>
                {isOwner && <TableCell className={styles.headerTitle} align="right"></TableCell>}
            </TableRow>
        </TableHead>
    )
}