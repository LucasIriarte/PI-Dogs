import React from "react"
import { Link, NavLink } from "react-router-dom"
import styles from './navBar.module.css'
import { useAuth0 } from "@auth0/auth0-react"


const NavBar = () => {
    const { loginWithRedirect, user } = useAuth0()
    console.log(user)
    return (
        <div className={styles.containerNavBar}>
            <Link to="/home"><img src="https://www.publicdomainpictures.net/pictures/340000/nahled/dog-silhouette-logo.png" alt="logoPage" className={styles.logoPage} /></Link>
            <div className={styles.conatinerLinks}>
                <NavLink to="/home" className={styles.linksNavBar}>Home</NavLink>
                <NavLink to="/form" className={styles.linksNavBar}>Create</NavLink>
                {!user?<NavLink to="#" onClick={() => loginWithRedirect()} className={styles.linksNavBar}>
                    Login
                </NavLink>: <NavLink to="/profile" className={styles.profileNavBar}><img src={user.picture} className={styles.pictureProfileNavBar}/></NavLink>}
            </div>
        </div>
    )
}

export default NavBar