import emailImg from "../../common/assets/emailImg.svg";
import "./checkEmail.scss";
export const CheckEmail: React.FC<PropsType> = ({ href }) => {
   return (
      <div className="check-email">
         <div className="check-email__img">
            <img src={emailImg} alt="" />
         </div>
         <h4 className="check-email__title">
            Check Email
         </h4>
         <div className="check-email__text">
            We’ve sent an Email with instructions to <a href={`https://${href}`} target={"_blank"} rel="noreferrer">{href}</a>
         </div>
      </div>
   )
}
type PropsType = {
   href: string
}
