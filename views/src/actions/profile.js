import axios from 'axios'

export const getProfile = () => dispatch=>{
   axios.get('/api/profile')
   .then(res=>dispatch({
     type:'FETCH_PROFILE',
     payload:res.data,
     status:res.status
   })
 )
   .catch((err) => {console.log('fetch PROFILE error',err)})
}

export default null
