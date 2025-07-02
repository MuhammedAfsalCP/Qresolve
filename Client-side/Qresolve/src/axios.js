import axios from "axios"

axios.defaults.withCredentials = true
axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000"

export default axios
