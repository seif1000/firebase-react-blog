
import {
    FACEBOOK_LOGIN,
    GET_USERNAME,
    GET_IMAGE,
    GET_EXTRA,
    GET_POSTS,
    GET_QUEST_DETAI,
    GET_RESPONSE,
 
} from '../action/type';

const initialState = {
    user:null,
    username:'',
    downUrl:null,
    userInformation:null,
    posts:null,
    questDetail:null,
    responses:null,
    responsUser:null,
}

export default function(state=initialState,action){
    switch (action.type) {
        case FACEBOOK_LOGIN:
            
        return{
            ...state,
             user:action.payload
        }
        case GET_USERNAME:
        return{
            ...state,
            username:action.payload
        }
        case GET_IMAGE:
        return{
            ...state,
            downUrl:action.payload
        }
        case GET_EXTRA :
        return{
            ...state,
            userInformation:action.payload
        }
        case GET_POSTS :
        return{
            ...state,
            posts:action.payload
        }
        case GET_QUEST_DETAI:
           return{
               ...state,
               questDetail:action.payload
           }
        case GET_RESPONSE:
        return{
            ...state,
            responses:action.payload
        }
      
      
    
        default:
           return state
    }
}