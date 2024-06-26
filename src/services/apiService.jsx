import axios from "axios";

const BASE_URL = "http://100.101.1.42:4001";

function login(body) {
    return axios.post(`${BASE_URL}/user/login`, body);
}

function logout(token) {
    return axios.delete(`${BASE_URL}/user/logout`, { headers: { Authorization: token } });
}

function checkSession(body) {
    return axios.post(`${BASE_URL}/user/session`, body);
}

function getReshape(body, token) {
    return axios.post(`${BASE_URL}/reshape`, body, { headers: { Authorization: token } });
}

function getContracts(token) {
    return axios.get(`${BASE_URL}/contracts`,{ headers: { Authorization: token } });
}

function getClientsList(token) {
    return axios.get(`${BASE_URL}/contracts/clientslist`,{ headers: { Authorization: token } });
}

function getOCIPrices() {
    return axios.get(`${BASE_URL}/price`);
}

function createUser(token, body) {
    return axios.post(`${BASE_URL}/user`, body, { headers: { Authorization: token } });
}

const apiService = { login, logout, checkSession, getReshape, getContracts, getClientsList, getOCIPrices, createUser };

export default apiService;