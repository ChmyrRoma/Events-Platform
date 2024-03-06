import axios from 'axios';

const API_BASE_URL = 'https://api.coo-e.com';

const getToken = () => {
  return localStorage.getItem('token');
}

const axiosConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  }
}

const login = ({ email, password }) => {
  return axios.post(`${API_BASE_URL}/users/login`, {email, password})
    .then((data) => data)
    .catch((error) => console.log(error))
}

const getUser = () => {
  return axios.get(`${API_BASE_URL}/users`, axiosConfig())
    .then((data) => data)
    .catch((error) => console.log(error))
}

export const userAPI = {
  login,
  getUser
}
