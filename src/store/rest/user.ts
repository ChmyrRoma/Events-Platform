import axios from 'axios';

const API_BASE_URL = process.env.REACT_API_BASE_URL;

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
  return axios.post(`${API_BASE_URL}/users/login`, { email, password })
    .then((data) => data)
    .catch((error) => console.log(error))
}

const signUp = ({ email, deviceId, timezone }) => {
  return axios.post(`${API_BASE_URL}/users`, { deviceId, email, timezone})
    .then((data) => data)
    .catch((error) => console.log(error))
}

const getUser = () => {
  return axios.get(`${API_BASE_URL}/users`, axiosConfig())
    .then((data) => data)
    .catch((error) => console.log(error))
}

const recoveryPassword = ({ email, deviceId }) => {
  return axios.post(`${API_BASE_URL}/contact-mechanisms/recovery`, { email, deviceId })
    .then((data) => data)
    .catch((error) => console.log(error))
}

const verificationEmail = ({ deviceId, email }) => {
  return axios.post(`${API_BASE_URL}/verify/send`, { deviceId, email1: email })
    .then((data) => data)
    .catch((error) => console.log(error))
}

const verificationValidate = ({ id, code }) => {
  return axios.post(`${API_BASE_URL}/verify/validate`, { email1: { id, code } })
    .then((data) => data)
    .catch((error) => console.log(error))
}

const register = (data) => {
  return axios.post(`${API_BASE_URL}/users/register`, data)
    .then((data) => data)
    .catch((error) => console.log(error))
}

const getGeoInfo = () => {
  return axios.get('https://ipapi.co/json/')
    .then((data) => data)
    .catch((error) => console.log(error))
}


export const userAPI = {
  login,
  signUp,
  getUser,
  recoveryPassword,
  verificationEmail,
  verificationValidate,
  register,
  getGeoInfo
};
