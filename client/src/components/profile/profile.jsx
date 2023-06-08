import React from "react";
import Styles from "./profile.module.css"
import variables from "../../variables.css";
import { useAuth0 } from "@auth0/auth0-react"
import img from "../img/arrow.png"
import { NavLink } from "react-router-dom"

const Profile = () => {
    const { user } = useAuth0()
    return (
        <main className={Styles.containerProfile}>
            <NavLink to="/home" className={Styles.conatinerArrowBack}>
                <img src={img} alt="Arrow back" className={Styles.arrowBack}/>
            </NavLink>
            <div className={Styles.filterBackgroundProfile}>
                <div className={Styles.profileCard}>
                    <img src={user.picture} alt="Img user" className={Styles.imgProfile} />
                    <h3 className={Styles.cardH3}>Name: {user.name}</h3>
                    <h3 className={Styles.cardH3}>Nickname: {user.nickname}</h3>
                    <h3 className={Styles.cardH3}>Email: {user.email}</h3>
                </div>
            </div>
        </main>
    )
}

export default Profile