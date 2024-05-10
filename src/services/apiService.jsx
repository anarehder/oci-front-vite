import axios from "axios";

const BASE_URL = "http://172.16.255.57:4000";
const BASE_OCI_URL = "https://apexapps.oracle.com/pls/apex/cetools/api/v1/products/";

function getReshape() {
    return axios.get(`${BASE_URL}/reshape`);
}

function getContracts() {
    return axios.get(`${BASE_URL}/contracts`);
}

function getOCIPrices() {
    return axios.get(`${BASE_URL}/price`);
}

const apiService = { getReshape, getContracts, getOCIPrices };

export default apiService;