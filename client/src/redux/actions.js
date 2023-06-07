import axios from 'axios'
import {
    GET_ALL_DOGS,
    GET_DOG_BY_NAME,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_BREEDS,
    GET_DETAIL,
    ORDER_BY_NAME,
    PAGINATION,
    CREATE_DOG,
    ERROR,
    DELETE_CARD
} from './types'



export const getAllDogs = () => {
    return async (dispatch) => {
        try {
            const response = (await axios.get('/dogs')).data
            dispatch({
                type: GET_ALL_DOGS,
                payload: response
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload:error
            })
        }
    }
}

export const getDogByName = (name) => {
    return async (dispatch) => {
        try {
            const response = (await axios.get(`/dogs?name=${name}`)).data
            dispatch({
                type: GET_DOG_BY_NAME,
                payload: response
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload:error
            })
        }
    }
}

export const getTemperaments = () => {
    return async (dispatch) => {
        try {
            const response = (await axios.get('/temperaments')).data
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: response
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload:error
            })
        }
    }
}

export const filterByTemperament = (temperament) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_BY_TEMPERAMENTS,
            payload: temperament
        })
    }
}

export const filterByBreeds = (breeds) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_BY_BREEDS,
            payload: breeds
        })
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try {
            const response = (await axios.get(`/dogs/${id}`)).data
            dispatch({
                type: GET_DETAIL,
                payload: response
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload:error
            })
        }
    }
}

export const orderByName = (asc) => {
    return (dispatch) => {
        dispatch({
            type: ORDER_BY_NAME,
            payload: asc
        })
    }
}

export const pagination = (nextPrev) => {
    return (dispatch) => {
        dispatch({
            type: PAGINATION,
            payload: nextPrev
        })
    }
}

export const createDog = (info) => {
    const {
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        minLifeSpan,
        maxLifeSpan,
        temperaments
    } = info
    const cleanTemps = temperaments.map((temperament) => temperament.name)
    return async (dispatch) => {
        await axios.post('/dogs', {
                name,
                minHeight,
                maxHeight,
                minWeight,
                maxWeight,
                minLifeSpan,
                maxLifeSpan,
                temperaments:cleanTemps
            })
            dispatch ({
                type:CREATE_DOG,
                payload:info
            })
    }
}

export const deleteCard = (id) => {
    return async(dispatch) => {
        try {
            const response = (await axios.delete(`/dogs/${id}`)).data
            dispatch({
                type:DELETE_CARD,
                payload:response
            })
        } catch (error) {
            dispatch({
                type:ERROR,
                payload:error
            })
        }
    }
}
