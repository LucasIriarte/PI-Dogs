import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getDetail } from "../../redux/actions"
import { useParams } from 'react-router-dom'
import styles from './detail.module.css'
import NavBar from "../navBar/navBar"



const Detail = () => {
    const { id } = useParams()
    const dogDetail = useSelector((state) => state.dogDetail)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])
    if(Object.entries(dogDetail).length !== 0) {
        return (
            <div className={styles.containerCardDetail}>
            <NavBar/>
            <div className={styles.filterContainerCardDetail}>
                <div className={styles.cardDetail}>
                    <div className={styles.containerImgDetail}>
                        <img src={dogDetail.image} alt="dog" className={styles.imgCardDetail} />
                    </div>
                    <h3 className={styles.textCard}>Name: {dogDetail.name}</h3>
                    <h3 className={styles.textCard}>Height: {dogDetail.height}</h3>
                    <h3 className={styles.textCard}>Weight: {dogDetail.weight}</h3>
                    <h3 className={styles.textCard}>Temperaments: {dogDetail.temperaments}</h3>
                    <h3 className={styles.textCard}>Life Span: {dogDetail.lifeSpan}</h3>
                </div>
            </div>
        </div>
        )
    }    
    else 
        return (
            <div className={styles.containerLoading}>
                <div className={styles.loadingFilter}>
                    <span className={styles.textLoading}>Loading...</span>
                </div>
            </div>
        )
}

export default Detail