import "./listTitle.scss"
export const ListTitle: React.FC<PropsType> = ({ title }) => <h3 className="list-title">{title}</h3>
type PropsType = {
   title: string
}