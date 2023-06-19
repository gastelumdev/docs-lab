import axios from "axios";
import API_URL from "../api/api_url";
import { TData } from "./types";
import config from "./config";

export const getData = (dataId: string | null) => {
    return axios.get(API_URL + `/${config.name}/` + dataId, {headers: {"Content-Type": "application/json", Authorization: "JWT " + localStorage.getItem("token"),}, params: {dataId: dataId}});
}

export const createData = (data: TData) => {
    return axios.post(API_URL + `/${config.name}`, data, {headers: {"Content-Type": "application/json", Authorization: "JWT " + localStorage.getItem("token"),}});
}

export const getOneData = (dataId: string) => {
    console.log(dataId)
    return axios.get(API_URL + `/${config.altName}/` + dataId, {headers: {"Content-Type": "application/json"}, params: {id: dataId}});
}

export const updateData = (data: TData) => {
    return axios.post(API_URL + `/${config.name}/update/` + data._id, data, {headers: {"Content-Type": "application/json", Authorization: "JWT " + localStorage.getItem("token"),}});
}

export const deleteData = (dataId: string) => {
    return axios.post(API_URL + `/${config.name}/delete/` + dataId, {dataId: dataId}, {headers: {"Content-Type": "application/json", Authorization: "JWT " + localStorage.getItem("token"),}});
}

// export const updateParticipantForm = (participant: TParticipant) => {
//     console.log(participant)
//     return axios.post(API_URL + "/participants/update/form/" + (localStorage.getItem("participantId") || participant._id), participant, {headers: {"Content-Type": "application/json"}});
// }