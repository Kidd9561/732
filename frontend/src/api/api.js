import axios from "axios";

// const apiAdress = "/mock";
const apiAdress = "http://bilibalabow.idv.tw:3001/api/v1";

// const headers = {
//     "Access-Control-Allow-Methods": 'GET, POST, OPTIONS',
//     "Access-Control-Allow-Headers": 'Content-Type, Authorization',
//     'Access-Control-Allow-Credentials': true,
//     "Access-Control-Allow-Origin" : "*",
//     "Content-type": "application/x-www-form-urlencoded"
// }

let getEventById = function (id) {
  return axios.get(apiAdress + "/event/" + id);
};

let getTimelineById = function (id) {
  return axios.get(apiAdress + "/eventgroup/" + id);
};

let getAllTimeline = function (id) {
  return axios.post("/eventgroup/recommend", { count: 10 });
};
let getEventGroups = function () {
  return axios.post(apiAdress + "/eventgroup/recommend", { count: 10 });
};

export { getEventById, getTimelineById, getEventGroups, getAllTimeline };
