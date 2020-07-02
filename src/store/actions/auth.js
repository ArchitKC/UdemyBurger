import * as actionType from './actionTypes'; 
import axiosInstance from '../../axios-order';

// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhKpEdBotw08x4VaQbwC7kSnOnac8VQ5U

export const authStart = ()=>{
    return{
        type : actionType.auth_start
    }
}
export const authSuccess = (token, userId)=>{
    return{
        type : actionType.auth_success,
        idtoken : token,
        userId : userId
    }
}
export const authFail = (error)=>{
    return{
        type : actionType.auth_fail,
        error:error
    }
}
export const authenticating = (email,password,isSign)=>{
    return dispatch=>{
        dispatch(authStart());
        let signUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhKpEdBotw08x4VaQbwC7kSnOnac8VQ5U';
        if(!isSign){
            signUrl='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDhKpEdBotw08x4VaQbwC7kSnOnac8VQ5U';
        }
        const authData ={
            email : email,
            password : password,
            restrictedToken : true
        }
        axiosInstance.post(signUrl,authData)
        .then((response)=>{
            console.log (response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            let expireTime = null;
            if(response.data.expiresIn === undefined){
                expireTime = 3600;
            }else {
                expireTime = response.data.expiresIn
            }
            dispatch(checkTimeOut(expireTime));
        })
        .catch((error)=>{
            dispatch(authFail(error));
        })
    }
}

export const authLogout = ()=>{
    return {
        type : actionType.auth_logout
    }
}

export const checkTimeOut = (expirationTime)=>{
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime * 1000);
    };
}


export const setAuthRedirectPath =(path)=>{
    return{
        type : actionType.set_auth_redirect_path,
        path : path
    }
}