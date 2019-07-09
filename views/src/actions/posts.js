import axios from 'axios'

export const getPosts = () => dispatch=>{
   axios.get('/api/post')
   .then(res=>dispatch({
     type:'FETCH_POST',
     payload:res.data,
     status:res.status
   })
 )
   .catch((err) => {console.log('fetch post error',err)})
}

export default null
