import axios from 'axios'

export default axios.create(
   {
      baseURL: 'https://dennymongoose.herokuapp.com/'
   }
)   