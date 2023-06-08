import styles from "./loading.module.css"


export const Loading = () => {
    return (
        <div className={styles.containerLoading}>
            <div className={styles.loadingFilter}>
                <span className={styles.textLoading}>Loading...</span>
            </div>
        </div>
    )
}