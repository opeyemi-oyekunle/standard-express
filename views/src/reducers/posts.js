import {postState} from '../store'

const posts = (state = postState, action)=>{
  if (action.type === 'FETCH_POST') return action.status = 200 ? (action.payload) : []
  return state
}

export default posts
