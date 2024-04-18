import axios from "axios";

const BASE_URL = "http://172.16.255.57:4000";

function getReshape() {
    console.log(BASE_URL);
    return axios.get(`${BASE_URL}/reshape`);
}

function getContracts() {
    console.log(BASE_URL);
    return axios.get(`${BASE_URL}/contracts`);
}

const apiService = { getReshape, getContracts };

export default apiService;