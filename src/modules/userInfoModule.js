import UserService from '../http/UserService';

export const LOGIN_USER = 'LOGIN';

export const loginUser = (userData)=>{
    const request = UserService.loginUser(userData).then(response => response.data)
    return {type : LOGIN_USER, payload: request}
}

const initailState = {loginSucces: null};
export default function userInfoReducer(state = initailState, action){
    switch(action.type){
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        default:
            return state;
    }
}
