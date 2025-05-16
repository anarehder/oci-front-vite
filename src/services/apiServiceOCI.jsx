import axios from "axios";

const BASE_URL = "http://100.101.1.42:4001";

function getDash(token, month) {
    return axios.get(`${BASE_URL}/dashboards/${month}`, { headers: { Authorization: token } });
}

function getJoinDash(body, token, month) {
    console.log(body);
    return axios.post(`${BASE_URL}/dashboards/join/${month}`, body, { headers: { Authorization: token } });
}

function getComputeInstances(token) {
    return axios.get(`${BASE_URL}/computeinstances`, { headers: { Authorization: token } });
}
function getJoinComputeInstances(body, token) {
    return axios.post(`${BASE_URL}/computeinstances/join`, body, { headers: { Authorization: token } });
}

function getAudits(token) {
    return axios.get(`${BASE_URL}/audit`, { headers: { Authorization: token } });
}

function getJoinAudits(body, token) {
    return axios.post(`${BASE_URL}/audit/join`, body, { headers: { Authorization: token } });
}

function getCpus(token) {
    return axios.get(`${BASE_URL}/cpus`, { headers: { Authorization: token } });
}

function getJoinCpus(body, token) {
    return axios.post(`${BASE_URL}/cpus/join`, body, { headers: { Authorization: token } });
}

function getComputeEvents(token) {
    return axios.get(`${BASE_URL}/computeinstances/events`, { headers: { Authorization: token } });
}

function getLatestValues(token){
    return axios.get(`${BASE_URL}/latest/cpumem`, { headers: { Authorization: token } });
}

function getComputeDetails(token, body){
    return axios.post(`${BASE_URL}/computeinstances/details`, body, { headers: { Authorization: token } });
}

function getBlockVolumes(token){
    return axios.get(`${BASE_URL}/blockvolume`, { headers: { Authorization: token } });
}

function getEvents(type, token){
    return axios.get(`${BASE_URL}/events/${type}`, { headers: { Authorization: token } });
}
const apiServiceOCI = { getDash, getJoinDash, getComputeInstances, getJoinComputeInstances, getAudits, getJoinAudits, getCpus, getJoinCpus, getComputeEvents, getLatestValues, getComputeDetails, getBlockVolumes, getEvents };

export default apiServiceOCI;