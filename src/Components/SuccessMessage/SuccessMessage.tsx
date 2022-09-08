import { IconButton } from "@mui/material"
import HomeIcon from '@mui/icons-material/Home';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { _pagesPath } from "../../pages/Routes/_path/pagesPath";
import { useNavigate } from "react-router-dom";
import "./successMessage.scss"
export const SuccessMessage = () => {
   const navigate = useNavigate()
   return (
      <div className="success-message">
         <div className="success-message__link">
            <IconButton onClick={() => { navigate(_pagesPath.MAIN) }}><HomeIcon />Home Page</IconButton>
         </div>
         <div className="success-message__body">
            <div className="success-message__icon">
               <CheckCircleOutlineIcon color="success" />
            </div>
            Password changed successfully
         </div>
      </div>
   )
}