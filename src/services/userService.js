import http from "../services/httpService";

const apiEndPoint = '/users';

export function checkId(id){
    if(id==='') return {data: false};
    return http.get(`${apiEndPoint}/${id}`);
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