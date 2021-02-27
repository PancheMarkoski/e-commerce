import axios from 'axios';

export default axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvP7imH8L2vbKukPaH3QBb22xHBfnkdSM'
})