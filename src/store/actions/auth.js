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
            let expireTime = null;
            if(response.data.expiresIn === undefined){
                expireTime = 3600;
            }else {
                expireTime = response.data.expiresIn
            }
            const expirationDate = new Date(new Date().getTime() + expireTime * 1000);
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));             
            dispatch(checkAuthTimeout(expireTime));
        })
        .catch((error)=>{
            dispatch(authFail(error));
        })
    }
}

export const authLogout = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type : actionType.auth_logout
    }
}

export const checkAuthTimeout = (expirationTime)=>{
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(authLogout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};