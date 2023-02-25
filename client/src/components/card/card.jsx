import React from "react"
import styles from './card.module.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCard } from "../../redux/actions";



const Card = (props) => {
    const dispatch = useDispatch()

    const handleDeleteCard = (e) => {
        dispatch(deleteCard(e.target.value))
    }
    return (
        <div className={styles.containerCard}>
            {props.dog.id.length > 5? <button onClick={handleDeleteCard} value={props.dog.id} className={styles.deleteCard}>X</button>:null}
            <Link to={`/dogs/${props.dog.id}`} className={styles.linkCards}>
                <h3>{props.dog.name}</h3>
                <div className={styles.containerImageCard}>
                    <img src={props.dog.image} alt="dogImage" className={styles.imageCard} />
                </div>
                <h4>Temperaments: {props.dog.temperaments}</h4>
                <h4>Weight: {props.dog.weight}</h4>
            </Link>
        </div>
    )
}

export default Card