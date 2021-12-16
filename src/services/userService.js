import http from "../services/httpService";

const apiEndPoint = '/users';

export function checkId(id){
    if(id==='') return {data: false};
    return http.get(`${apiEndPoint}/checkId/${id}`);
}

export function signup(body){
    return http.post(apiEndPoint, body);
}

export function emailVerification(body){
    return http.put(`${apiEndPoint}/verification`, body);
}

export function resendVerificationCode(){
    return http.get(`${apiEndPoint}/getVerificationCode`);
}

export function generateResetPasswordLink(body){
    return http.put(`${apiEndPoint}/passwordResetLink`, body);
}

export function validatePasswordResetLink(token){
    return http.put(`${apiEndPoint}/validatePasswordResetLink?token=${token}`);
}

export function resetPassword(body, token){
    return http.put(`${apiEndPoint}/resetPassword?token=${token}`, body);
}

export function authUser(){
    return http.get(`${apiEndPoint}/me`);
}

export function updateUser(body){
    return http.put(apiEndPoint, body);
}

export function changePassword(body){
    return http.put(`${apiEndPoint}/changePassword`, body);
}

export function scheduleAccountDelete(body){
    return http.put(`${apiEndPoint}/scheduleDelete`, body);
}

export function cancelAccountDelete(){
    return http.put(`${apiEndPoint}/cancelDelete`);
}

export function findUser(searchString){
    return http.get(`${apiEndPoint}/getUsers?searchString=${searchString}`);
}

export function getUser(username){
    return http.get(`${apiEndPoint}/getUser/${username}`);
}

export function followOrUnFollow(body){
    return http.put(`${apiEndPoint}/handleFollow`, body);
}

export function getNotificatonCount(){
    return http.get(`${apiEndPoint}/notification-count`)
}

export function getNotifications(){
        return http.get(`${apiEndPoint}/get-notifications`)
}