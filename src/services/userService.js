import axios from '../axios'
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}
const getAllUser = (userId) => {
    return axios.get(`/api/get-all-users?id=${userId}`);
}
const createNewUserApi = (user) => {
    return axios.post('/api/create-new-user', user);
}
export {
    handleLoginApi, getAllUser, createNewUserApi
}