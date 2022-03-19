import axios from 'axios'

//'proxy' setting in the package.json automatically maps the http://localhost:5000 to this endpoint ...
const API_URL = '/api/users/'

//Register user 
const register  = async (userData) => {
    const response = await axios.post(API_URL, userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data)) //because localStorage can only stored strings...
    }
    return response.data 
}

const login  = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = () => localStorage.removeItem('user')

const authService = {
    register, login , logout
}
export default authService