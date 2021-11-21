import {ButtonProps} from "./Button.props";
import styles from './Button.module.scss'
import cn from "classnames";

export const Button = ({className}:ButtonProps):JSX.Element => {
    return (
        <button className={cn(styles.btn, className)}>Зарегистрироваться</button>
    )
}