import UserService from '../http/UserService';

export const LOGIN_USER = 'LOGIN';
export const USER_AUTH = 'AUTH';
export const LOGOUT_USER = 'LOGOUT';

export const loginUser = (userData)=>{
    const request = UserService.loginUser(userData).then(response => response.data)
    return {type : LOGIN_USER, payload: request}
}
export const userAuth = ()=>{
    const request = UserService.userProfile().then(response => response.data)
    return {type : USER_AUTH, payload: request}
}
export const logoutUser = ()=>{
    const request = UserService.signoutUser().then(response => response.data)
    return {type : LOGOUT_USER, payload: request}
}

const initailState = {};
export default function userInfoReducer(state = initailState, action){
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case USER_AUTH:
            return { ...state, userAuthInfo: action.payload }
        case LOGOUT_USER:
            return { ...state, logoutSucces: action.payload, userAuthInfo: null, loginSucces: null }
        default:
            return state;
    }
}
