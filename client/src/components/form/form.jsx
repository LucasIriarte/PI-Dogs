import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from './form.module.css'
import { createDog } from "../../redux/actions"
import NavBar from "../navBar/navBar";

const Form = () => {
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const [infoForm, setInfoForm] = useState({
        name: "",
        minHeight: "",
        maxHeight: "",
        minWeight: "",
        maxWeight: "",
        temperaments: [],
        minLifeSpan: "",
        maxLifeSpan: "",
    })
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState({})

    
    const validate = (input) => {
        let errors = {}
        if (!input.name) {
            errors.name = "Name is required"
        }
        if (input.name.length < 4) {
            errors.name = "The name must have at least 3 letters"
        }
        if (!input.minHeight || !input.maxHeight) {
            errors.height = "Height is required (min & max)"
        }
        if (!errors.height && input.minHeight - input.maxHeight >= 0) {
            errors.heightInvalid = "Max height not exceeds min height"
        }
        if (!input.minWeight || !input.maxWeight) {
            errors.weight = "Weight is required (min & max)"
        }
        if (!errors.weight && input.minWeight - input.maxWeight >= 0) {
            errors.weightInvalid = "Max weight not exceeds min weight"
        }
        if (input.temperaments.length === 0) {
            errors.temperaments = "Temperaments are required"
        }
        if (!input.minLifeSpan || !input.maxLifeSpan) {
            errors.lifeSpan = "Life span is required (min & max)"
        }
        if (!errors.lifeSpan && input.minLifeSpan - input.maxLifeSpan >= 0) {
            errors.invalidLifeSpan = "Max life span not exceeds min life span"
        }
        return errors
    }

    const handleChange = (e) => {
        setSubmit({})
        setInfoForm({
            ...infoForm,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...infoForm,
            [e.target.name]: e.target.value
        }))
    }
    const handleChangeTemperment = (e) => {
        if (!infoForm.temperaments.includes((item) => item.name === e.target.value)) {
            infoForm.temperaments.push(
                temperaments.find((item) => item.name === e.target.value)
            );
        }
        setErrors(
            validate({
                ...infoForm,
                [e.target.name]: e.target.value,
            })
        );
    }

    const handleSubmit = (e) => {
        setSubmit({
            ...submit,
            submit:"submit"})
        dispatch(createDog(infoForm))
        setInfoForm({
            name: "",
            minHeight: "",
            maxHeight: "",
            minWeight: "",
            maxWeight: "",
            temperaments: [],
            minLifeSpan: "",
            maxLifeSpan: "",
        })
    }

    const handleDeleteTemperament = (e) => {
        const filterTemperaments = infoForm.temperaments.filter((temperament)=>temperament.name !== e.target.value)
        setInfoForm({
            ...infoForm,
            temperaments:filterTemperaments
        })
    }

    return (
        <div className={styles.containerForm}>
            <NavBar />
            <div className={styles.containerFormFilter}>
                <form className={styles.formContainer}>
                    <label className={styles.labelFormName}>Name:</label>
                    <div className={styles.containerInput}>
                        <input type="text" name="name" placeholder="Type a name..." onChange={handleChange} className={styles.inputsForm} />
                        {errors.name && <span className={styles.labelErrors}>{errors.name}</span>}
                    </div>
                    <label className={styles.labelForm}>Height:</label>
                    <div className={styles.containerInput}>
                        <input type="number" name="minHeight" value={infoForm.minHeight} placeholder="Type a min height..." onChange={handleChange} min="1" className={styles.inputsForm} />
                        <input type="number" name="maxHeight" value={infoForm.maxHeight} placeholder="Type a max height..." onChange={handleChange} min="1" className={styles.inputsForm} />
                        {errors.height && <span className={styles.labelErrors}>{errors.height}</span>}
                        {errors.heightInvalid && <span className={styles.labelErrors}>{errors.heightInvalid}</span>}
                    </div>
                    <label className={styles.labelForm}>Weight:</label>
                    <div className={styles.containerInput}>
                        <input type="number" name="minWeight" value={infoForm.minWeight} placeholder="Type a min weight..." onChange={handleChange} min="1" className={styles.inputsForm} />
                        <input type="number" name="maxWeight" value={infoForm.maxWeight} placeholder="Type a max weight..." onChange={handleChange} min="1" className={styles.inputsForm} />
                        {errors.weight && <span className={styles.labelErrors}>{errors.weight}</span>}
                        {errors.weightInvalid && <span className={styles.labelErrors}>{errors.weightInvalid}</span>}
                    </div>
                    <label className={styles.labelForm}>Temperaments:</label>
                    <div className={styles.containerInput}>
                        <select name="temperaments" onChange={handleChangeTemperment} className={styles.selectTemperaments}>
                            {temperaments?.map((item) => (
                                <option value={item.name} key={item.id} className={styles.selectTemperaments}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.temperaments ? <label className={styles.labelErrors}>{errors.temperaments}</label> : null}
                    </div>

                    <div className={styles.containerTemperamentsSelected}>
                        {infoForm.temperaments.length ? infoForm.temperaments.map(e => <span key={e.id} className={styles.temperamentsSelected}>{e.name} <button value={e.name} onClick={handleDeleteTemperament} type="button" className={styles.deleteTemperament}>x</button></span>) : null}
                    </div>
                    <label className={styles.labelForm}>Life span:</label>
                    <div className={styles.containerInput}>
                        <input type="number" name="minLifeSpan" value={infoForm.minLifeSpan} placeholder="Type a min life span..." onChange={handleChange} min="1" className={styles.inputsForm} />
                        <input type="number" name="maxLifeSpan" value={infoForm.maxLifeSpan} placeholder="Type a max life span..." onChange={handleChange} min="1" className={styles.inputsForm} />
                        {errors.lifeSpan && <span className={styles.labelErrors}>{errors.lifeSpan}</span>}
                        {errors.invalidLifeSpan && <span className={styles.labelErrors}>{errors.invalidLifeSpan}</span>}
                    </div>
                    {Object.entries(errors).length === 0 && infoForm.name !== "" ? <button type="submit" onClick={handleSubmit} className={styles.btnSubmitForm}>Create</button> : null}
                    {Object.entries(submit).length !== 0?<label className={styles.labelCreated}>Created!</label>:null}
                </form>
            </div>
        </div>
    )
}

export default Form