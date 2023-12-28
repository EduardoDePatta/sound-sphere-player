import axios from 'axios'
import baseUrl from '../constants/baseUrl'

const client = axios.create({
  baseURL: baseUrl,
})

export default client
