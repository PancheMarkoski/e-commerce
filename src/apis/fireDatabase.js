import axios from 'axios'

export default axios.create({
    baseURL: 'https://login-e872f-default-rtdb.europe-west1.firebasedatabase.app'
})