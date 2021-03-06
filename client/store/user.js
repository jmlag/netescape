import axios from 'axios'
import history from '../history'

import { getCart, deleteCart, getHistory, deleteHistory } from './index.js'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
const onLogin = dispatch => {
  dispatch(getCart())
  dispatch(getHistory())
}

const onLogout = dispatch => {
  dispatch(removeUser())
  dispatch(deleteCart())
  dispatch(deleteHistory())
  history.push('/login')
}

export const me = () =>
  dispatch =>
    axios.get('/auth/me')
      .then(res => {
        if (res.data){
          onLogin(dispatch)
        }
        return dispatch(getUser(res.data || defaultUser))
      })
      .catch(err => console.log(err))

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/auth/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/packages')
      })
      .catch(error =>
        dispatch(getUser({error})))

export const logout = () =>
  dispatch =>
    axios.post('/auth/logout')
      .then(res => {
        onLogout(dispatch)
      })
      .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
