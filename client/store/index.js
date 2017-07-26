import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import user from './user'
import packages from './package'
import cart from './cart'

const reducer = combineReducers({
  user,
  packages,
  cart,
})

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(reducer, middleware);

export default store
export * from './user'
export * from './package'
export * from './cart'
