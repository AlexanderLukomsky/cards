import moment from "moment";
import React, { useEffect } from "react";
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
      const formatedDateAsArr = moment(date).format("DD.MM.YYYY").split('.')
      return formatedDateAsArr
   }
   console.log(cards);
   return (
      <TableBody>
         {
            cards.map(c =>
               <TableRow key={c._id}>
                  <TableCell align="center" className="cards-list__question" component="th" scope="row">{c.question}</TableCell>
                  <TableCell className="cards-list__answer" align="center">{c.answer}</TableCell>
                  <TableCell className="cards-list__update-date" align="center" >{
                     formatDate(c.updated)
                        .map((d, i, arr) => i < arr.length - 1 ?
                           <span key={i}>{d}<span>.</span></span> :
                           <span key={i}>{d}</span>)
                  }</TableCell>
                  <TableCell align="center">
                     <StyledRating
                        readOnly
                        name="highlight-selected-only"
                        defaultValue={Math.round(c.grade)}
                        IconContainerComponent={
                           (props) => <IconContainer
                              value={props.value}
                              className={props.className}
                              defaultValue={Math.round(c.grade)}
                           />
                        }
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

const IconContainer = React.memo((props: IconContainerProps) => {
   let { value, ...other } = props;
   let className: string
   if (other.defaultValue! > 0) {
      className = other.defaultValue === value ? ' active' : ''
   } else {
      className = value === 1 ? ' base' : ''
   }
   return <span  {...other} className={`${other.className}${className}`}>{customIcons[value].icon}</span>;
})