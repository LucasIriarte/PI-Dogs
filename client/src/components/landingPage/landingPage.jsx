import React from "react";
import { NavLink } from "react-router-dom";
import styles from './landingPage.module.css'

const LangingPage = () => {
    return (
        <div className={styles.backgroundLandingPage}>
            <div className={styles.filterBackgroundLandingPage}>
                <NavLink to="/home" className={styles.navLink}>Enter here!</NavLink>
            </div>
        </div>
    )
}


export default LangingPage