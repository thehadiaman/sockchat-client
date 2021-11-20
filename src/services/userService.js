import http from "../services/httpService";

const apiEndPoint = '/users'

export function checkId(id) {
    if(id==='') return {data: false};
    return http.get(`${apiEndPoint}/${id}`);
}