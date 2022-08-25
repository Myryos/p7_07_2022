import axios from 'axios'



export default axios.create({
    baseURL: 'http://localhost:3000',
    headers: {'Content-Type': 'application/json'},
    withCredentials:true
})

export const axiosPrivate = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true
})