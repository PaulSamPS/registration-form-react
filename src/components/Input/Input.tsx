import {InputProps} from './Input.props'
import styles from './Inputs.module.scss'
import cn from 'classnames'

export const Input = ({className, ...props}:InputProps):JSX.Element => {
    return (
        <div className={styles.inputWrapper}>
            <input className={cn(styles.input,className)} { ...props } />
        </div>
    )
}