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
    baseURL: `https://5d5d-41-80-113-42.ngrok.io/`,
    timeout: 10000,
    headers,
  });
}
