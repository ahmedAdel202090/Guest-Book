import * as actionTypes from './actionTypes';
import Actions from './Actions';


export const initialState = {
    created:null,
    user:null,
    guestbooks:[],
    selectedGuestBook : null,
    invitedUser:null
};

export const Reducer = (state = initialState , action) =>{
    let actions = new Actions(state);
    switch (action.type) {
        case actionTypes.REGISTER:
            return actions.register(action.user,action.err);
        case actionTypes.SET_DEFAULT_CREATED:
            return actions.setCreated(null);
        case actionTypes.LOGIN:
            return actions.login(action.value, action.err);
        case actionTypes.SHOW_ALL_GUESTBOOKS:
            return actions.showAllGuestBooks(action.guestbooks,action.err);
        case actionTypes.CREATE_GUESTBOOK:
            return actions.addGuestBook(action.guestbook,action.err);
        case actionTypes.SHOW_GUESTBOOK:
            return actions.getGuestBook(action.messages,action.id,action.name,action.err);
        case actionTypes.GET_USER:
            return  actions.loginUser(action.user,action.err);
        case actionTypes.LOGOUT:
            return actions.logout();
        case actionTypes.SET_GUESTBOOK:
            return actions.setSelectedGuestBook(action.guestbook);
        case actionTypes.SHOW_MESSAGES:
            return  actions.showMessages(action.messages,action.err);
        case actionTypes.CREATE_MESSAGE:
            return actions.createMessage(action.message,action.err);
        case actionTypes.REPLY_MESSAGE:
            return actions.reply(action.message,action.err);
        case actionTypes.DELETE_MESSAGE:
            return actions.deleteMessage(action.messageId,action.err);
        case actionTypes.INVITE_USER:
            return actions.inviteUser(action.value,action.err);
        default:
            break;
    }
    return state;
};