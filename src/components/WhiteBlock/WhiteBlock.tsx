import {WhiteBlockProps} from './WhiteBlock.props'
import styles from './WhiteBlock.module.scss'

export const WhiteBlock = ({children}: WhiteBlockProps):JSX.Element => {
    return (
        <div className={styles.whiteBg}>
            {children}
        </div>
    )
}