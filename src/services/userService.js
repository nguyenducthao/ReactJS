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
const deleteUserApi = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}
const editUserApi = (user) => {
    return axios.put('/api/edit-user', user);
}
const getAllCodeApi = (inputType) => {
    return axios.get(`/api/get-allcode?type=${inputType}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}
export {
    handleLoginApi,
    getAllUser,
    createNewUserApi,
    deleteUserApi,
    editUserApi,
    getAllCodeApi,
    getTopDoctorHomeService
}