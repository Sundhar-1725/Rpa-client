import axios from 'axios'

// const API_URL = "http://3.12.48.129:7500/api"
const API_URL = "http://localhost:7500/api"
export const API = axios.create({
    baseURL:API_URL
})
const nodeAPI_URL = "http://localhost:5050/api"
export const NODEAPI = axios.create({
    baseURL:nodeAPI_URL
})