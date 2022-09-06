import moment from "moment";
import React from "react";
import { IconContainerProps, Rating, TableBody, TableCell, TableRow } from "@mui/material";

import { styled } from '@mui/material/styles';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';


import { CardsType } from "../../../../api/cards-api";
export const CardsListContainer: React.FC<PropsType> = React.memo(({ cards }) => {
   const formatDate = (date: Date) => {
      return moment(date).format("DD.MM.YYYY")
   }
   return (
      <TableBody>
         {
            cards.map(c =>
               <TableRow key={c._id}>
                  <TableCell component="th" scope="row">{c.question}</TableCell>
                  <TableCell align="center">{c.answer}</TableCell>
                  <TableCell align="right">{formatDate(new Date())}</TableCell>
                  <TableCell align="center">
                     <StyledRating
                        readOnly
                        name="highlight-selected-only"
                        defaultValue={c.grade}
                        IconContainerComponent={IconContainer}
                        getLabelText={(value: number) => customIcons[value].label}
                        highlightSelectedOnly
                     />
                  </TableCell>
               </TableRow>
            )
         }
      </TableBody>
   )
})
type PropsType = {
   cards: CardsType[]
}
//*
const StyledRating = styled(Rating)(({ theme }) => ({
   '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
      color: theme.palette.action.disabled,
   },
}));
const customIcons: {
   [index: string]: {
      icon: React.ReactElement;
      label: string;
   };
} = {
   0: {
      icon: <SentimentVeryDissatisfiedIcon color="disabled" />,
      label: 'Very Dissatisfied',
   },
   1: {
      icon: <SentimentVeryDissatisfiedIcon color="error" />,
      label: 'Very Dissatisfied',
   },
   2: {
      icon: <SentimentDissatisfiedIcon color="error" />,
      label: 'Dissatisfied',
   },
   3: {
      icon: <SentimentSatisfiedIcon color="warning" />,
      label: 'Neutral',
   },
   4: {
      icon: <SentimentSatisfiedAltIcon color="success" />,
      label: 'Satisfied',
   },
   5: {
      icon: <SentimentVerySatisfiedIcon color="success" />,
      label: 'Very Satisfied',
   },
};

function IconContainer(props: IconContainerProps) {
   const { value, ...other } = props;
   return <span {...other}>{customIcons[value].icon}</span>;
}