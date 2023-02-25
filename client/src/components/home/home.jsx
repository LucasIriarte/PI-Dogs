import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { filterByBreeds, filterByTemperament, getAllDogs, getTemperaments, orderByName, pagination } from "../../redux/actions"
import Card from '../card/card.jsx'
import NavBar from "../navBar/navBar"
import SearchBar from "../searchBar/searchBar"
import styles from './home.module.css'



const Home = () => {
    // me suscribo a los estados globales a utilizar
    const dispatch = useDispatch()
    const dogs = useSelector((state) => state.dogs)
    const temperaments = useSelector((state) => state.temperaments)
    const errors = useSelector((state) => state.errors)
    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getTemperaments());
    }, [dispatch])


    const handleSelectTemperaments = (e) => {
        dispatch(filterByTemperament(e.target.value))
    }

    const handleSelectBreed = (e) => {
        dispatch(filterByBreeds(e.target.value))
    }
    const handleSelectOrderByName = (e) => {
        dispatch(orderByName(e.target.value))
    }

    const allDogs = dogs.length
    const dogsPerPage = 8
    let numOfPages = Math.ceil(allDogs / dogsPerPage)
    let pageNumber = useSelector((state) => state.pagination)
    const dogsToSkip = (pageNumber - 1) * dogsPerPage
    const dogsForShow = dogs.slice(dogsToSkip, dogsPerPage + dogsToSkip)
    if (dogs.length) {
        return (
            <div className={styles.containerHome}>
                <NavBar />
                <SearchBar />
                <div className={styles.backgroundContainerFilters}>
                    <div className={styles.conatinerFilters}>
                        <div className={styles.conatinerFilterByTemperaments}>
                            {/******************************* filtro por temperamento *******************************/}
                            <label>Temperaments: </label>
                            <select onChange={handleSelectTemperaments} className={styles.selectsFilters}>
                                <option className={styles.options}>All</option>
                                {
                                    temperaments.map((el) => (
                                        <option className={styles.options} key={el.name} value={el.name}>
                                            {el.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className={styles.containerFilterByBreed}>
                            {/*******************************  filtro por raza *******************************/}
                            <label >Breeds: </label>
                            <select onChange={handleSelectBreed} className={styles.selectsFilters}>
                                <option value="All">All</option>
                                <option value="Created">Created</option>
                                <option value="Api">Api</option>
                            </select>
                        </div>
                        <div className={styles.conatinerFilterByName}>
                            {/************************************ ordenar ascendente o descendente **********************************/}
                            <label>Order by name: </label>
                            <select onChange={handleSelectOrderByName} className={styles.selectsFilters}>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>
                        </div>
                    </div>
                </div>
                {Object.entries(errors).length !== 0 ?
                    // me fijo que no haya errores, si hay alguno lo muestro
                    <div className={styles.containerError}>
                        <h1 className={styles.errorH1}>{errors.response.data}</h1>
                    </div> : <div className={styles.containerCardsButtons}>
                        <div className={styles.containerCards}>
                            {
                                dogsForShow.map(dog => dog.id.length > 5? <Card key={dog.id} dog={dog}/>:<Card key={dog.id} dog={dog} />)
                            }
                        </div>
                        {/*********************** paginado *************************/}
                        <button className={pageNumber === 1 ? styles.btnHidden : styles.btnPagination} value="prev" onClick={(e) => { dispatch(pagination(e.target.value)) }}>prev</button>
                        <button className={pageNumber === numOfPages ? styles.btnHidden : styles.btnPagination} value="next" onClick={(e) => dispatch(pagination(e.target.value))}>next</button>
                    </div>
                }
            </div>
        )
    }
    else {
        return (
            <div className={styles.containerLoading}>
                <div className={styles.loadingFilter}>
                    <span className={styles.textLoading}>Loading...</span>
                </div>
            </div>
        )
    }

}

export default Home