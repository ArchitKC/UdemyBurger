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
        })
        .catch((error)=>{
            dispatch(authFail(error));
        })
    }
}