import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducer'



const Store = createStore(rootReducer, compose(
    applyMiddleware(thunk)
  ))

export default Store