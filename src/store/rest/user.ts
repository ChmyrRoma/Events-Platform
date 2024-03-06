import axios from 'axios';

const API_BASE_URL = 'https://api.coo-e.com';

const login = ({ email, password }) => {
  return axios.post(`${API_BASE_URL}/users/login`, {email, password})
    .then((data) => data)
    .catch((error) => console.log(error))
}

export const userAPI = {
  login
}
