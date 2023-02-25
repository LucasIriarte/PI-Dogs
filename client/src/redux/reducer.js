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
} from "./types"

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    dogDetail: [],
    pagination: 1,
    errors: {}
}



const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
            case GET_DOG_BY_NAME: {
                return {
                    ...state,
                    errors: {},
                    dogs: action.payload
                }
            }
            case GET_TEMPERAMENTS: {
                return {
                    ...state,
                    temperaments: action.payload
                }
            }
            case FILTER_BY_TEMPERAMENTS: {
                const allDogs = state.allDogs;
                if (action.payload === "All") {
                    return {
                        ...state,
                        pagination: 1,
                        dogs: allDogs
                    }
                } else {
                    const filterByTemperament = allDogs.filter((dog) => dog.temperaments !== undefined && dog.temperaments.includes(action.payload))
                    return {
                        ...state,
                        pagination: 1,
                        dogs: filterByTemperament
                    }
                }
            }
            case FILTER_BY_BREEDS: {
                if (action.payload === "Created") {
                    const filterByBreedsDB = state.allDogs.filter((dog) => dog.id.toString().length > 5)
                    if (!filterByBreedsDB.length) {
                        return {
                            ...state,
                            pagination: 1,
                            errors: {
                                response: {
                                    data: "No dogs created yet"
                                }
                            }
                        }
                    }
                    return {
                        ...state,
                        errors: {},
                        pagination: 1,
                        dogs: filterByBreedsDB
                    }
                }
                if (action.payload === "Api") {
                    const filterByBreedsApi = state.allDogs.filter(dog => dog.id.toString().length < 5)
                    return {
                        ...state,
                        errors: {},
                        pagination: 1,
                        dogs: filterByBreedsApi
                    }
                } else return {
                    ...state,
                    errors: {},
                    pagination: 1,
                    dogs: state.allDogs
                }
            }
            case GET_DETAIL: {
                return {
                    ...state,
                    dogDetail: action.payload
                }
            }
            case ORDER_BY_NAME:
                const sortedName = []
                const aux = action.payload === "A-Z" ? state.dogs.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (a.name < b.name) {
                        return -1
                    } else return 0
                }) : state.dogs.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (a.name < b.name) {
                        return 1
                    } else return 0
                })
                return {
                    ...state,
                    dogs: aux.concat(sortedName)
                }
                case CREATE_DOG:
                    return {
                        ...state
                    }

                    case PAGINATION:
                        if (action.payload === "next") {
                            return {
                                ...state,
                                pagination: state.pagination + 1
                            }
                        } else return {
                            ...state,
                            pagination: state.pagination - 1
                        }
                    case ERROR:
                        return {
                            ...state,
                            errors: action.payload
                        }
                    case DELETE_CARD: 
                        const dogsShowded = state.dogs
                        const dogDelete = action.payload.find(e=>e.hasOwnProperty('dogDelete'))
                        const dogDeleteId = dogDelete.dogDelete.id
                        const dogsForShow = dogsShowded.filter(e=>e.id !== dogDeleteId)
                        const allDogs = state.allDogs.filter(dog=> dog.id !== dogDeleteId)
                        if(!dogsForShow.length) {
                            return {
                                ...state,
                                pagination:1,
                                errors: {
                                    response: {
                                        data: "No dogs created yet"
                                    }
                                }
                            }
                        }
                        return {
                            ...state,
                            dogs:dogsForShow,
                            allDogs:allDogs
                        }
                        default:
                            return state
    }
}

export default rootReducer