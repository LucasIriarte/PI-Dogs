import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { getDogByName } from "../../redux/actions"
import styles from './searchBar.module.css'

export default function SearchBar() {
    
    const [name, setName] = useState("")
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const newName = e.target.value;
        setName(newName);
        dispatch(getDogByName(newName));
    }

    return (
        <div className={styles.containerSearchBar}>
            <input type="text" onChange={handleChange} className={styles.inputSearchBar} placeholder="Search..."/>
        </div>
    )
}
