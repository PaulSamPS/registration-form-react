import styles from './Header.module.scss'

export const Header = ():JSX.Element => {
    return (
        <>
            <h1 className={styles.title}>Регистрация</h1>
            <div className={styles.subTitle}>
                <p>Уже есть аккаунт?</p>
                <p className={styles.signIn}>Войти</p>
            </div>
        </>
    )
}