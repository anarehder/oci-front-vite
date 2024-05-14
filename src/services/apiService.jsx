import axios from "axios";

const BASE_URL = "http://172.16.255.57:4000";
const BASE_URL2 = "http://172.16.255.57:4002";
const BASE_OCI_URL = "https://apexapps.oracle.com/pls/apex/cetools/api/v1/products/";

function login(body) {
    return axios.post(`${BASE_URL2}/user/login`, body);
}

function logout(token) {
    return axios.delete(`${BASE_URL2}/user/logout`, { headers: { Authorization: token } });
}

function getReshape() {
    return axios.get(`${BASE_URL}/reshape`);
}

function checkSession(body) {
    return axios.post(`${BASE_URL2}/user/session`, body);
}

function getReshape2(body, token) {
    return axios.post(`${BASE_URL2}/reshape`, body, { headers: { Authorization: token } });
}

function getContracts2(token) {
    return axios.get(`${BASE_URL2}/contracts`,{ headers: { Authorization: token } });
}

function getContracts() {
    return axios.get(`${BASE_URL}/contracts`);
}

function getOCIPrices() {
    return axios.get(`${BASE_URL}/price`);
}

const apiService = { login, logout, checkSession, getReshape, getContracts, getOCIPrices, getReshape2, getContracts2 };

export default apiService;