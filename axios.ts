import axios, {AxiosRequestHeaders} from "axios";

export const getInstance = () => {
  const token = window.localStorage.getItem('token')
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['Authorization'] = 'Token ' + token
  }
  return axios.create({
    baseURL: `https://0351-41-80-112-47.ngrok.io/`,
    timeout: 10000,
    headers,
  });
}
