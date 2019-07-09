import {profileState} from '../store'

const profile = (state = profileState, action)=>{
  if (action.type === 'FETCH_PROFILE') return action.status = 200 ? (action.payload) : []
  return state
}

export default profile
