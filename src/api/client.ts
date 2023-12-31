import axios, { CreateAxiosDefaults } from 'axios'
import baseURL from '../constants/baseUrl'
import { Keys, getFromAsyncStorage } from '../storage/asyncStorage'

type Headers = CreateAxiosDefaults<any>['headers']

export const getClient = async (headers?: Headers) => {
  const token = `Bearer ${await getFromAsyncStorage(Keys.AUTH_TOKEN)}`
  if (!token) {
    return axios.create({
      baseURL,
    })
  }
  const defaultHeaders = {
    Authorization: token,
    ...headers,
  }
  return axios.create({ baseURL, headers: defaultHeaders })
}
