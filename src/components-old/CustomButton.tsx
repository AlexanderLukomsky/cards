import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type PropsType = DefaultButtonPropsType & {
    className: string
}
export const CustomButton = ({ title, onClick, className, ...restProps }: PropsType) => (
    <button className={className} onClick={onClick}
        {...restProps}
    />
)