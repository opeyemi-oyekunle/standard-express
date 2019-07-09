import {createStore, combineReducers, applyMiddleware} from 'redux'
import posts from './reducers/posts'
import profile from './reducers/profile'
import thunk from 'redux-thunk'

const middleware = [thunk]

export const postState = {
  posts:[]
}
export const profileState = {
  profile:[]
}
const reducers = combineReducers({posts, profile})
const store = createStore(reducers, applyMiddleware(...middleware))

export default store
