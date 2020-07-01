import * as actionTypes from '../actions/actionTypes';
import {updateObject} from './../utility';

const initialState={
    error:null,
    loading : false,
    token : null
}

const authStart = (state,action)=>{
    return updateObject(state, {loading : true, error : null})
}

const authSuccess = (state,action)=>{
    return updateObject(state,{
        token : action.idtoken,
        error : action.error,
        loading : false,
        userId : action.userId
    });
}

const authFail = (state,action)=>{
    return updateObject(state,{
        loading : false,
        error : action.error
    });
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case actionTypes.auth_start :return authStart(state,action);
        case actionTypes.auth_success :return authSuccess(state,action);
        case actionTypes.auth_fail :return authFail(state,action);
        default :
        return state;
    }

}

export default reducer;