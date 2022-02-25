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
    baseURL: `https://bathroom-finders.herokuapp.com/`,
    timeout: 10000,
    headers,
  });
}
