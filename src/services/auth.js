import http from "../services/httpService";

const apiEndPoint = '/auth';

export function login(body) {
    return http.post(apiEndPoint, body);
}