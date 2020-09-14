import * as actionTypes from './actionTypes';
import Cookies from 'universal-cookie';


async function doRequest(url, method, body,authHeader={}) {
    let formBody = [];
    if(method === 'POST' || method === 'PUT'){
        for (let property in body) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    }
    let requestOptions = method ==='POST' || method === 'PUT'? {
        method: method,
        headers: {"Content-Type":"application/x-www-form-urlencoded",...authHeader},
        body: formBody
    }: {
        method:method,
        headers:authHeader,
        mode:'cors'
    };
    try {
        let response = await fetch(url, requestOptions);
        response = await response.json();
        return response;
    }
    catch(err){
        throw err;
    }
}


export const register = (data) => {
  return (dispatch) => {
      const body = {
          name:data.name,
          username:data.username,
          password:data.password
      }
      doRequest('http://localhost:5000/auth/register','POST',body)
          .then(res => dispatch({type:actionTypes.REGISTER,user:res}))
          .catch(err => dispatch({type:actionTypes.REGISTER,err:err}));
  };
};
export const login = (data) => {
    return (dispatch) => {
      const body = {
          username:data.username,
          password:data.password
      }
      doRequest('http://localhost:5000/auth/login','POST',body)
          .then(res => dispatch({type:actionTypes.LOGIN,value:res}))
          .catch(err => dispatch({type:actionTypes.LOGIN,err:err}));
    };
}

export const setCreatedNull = () => {
    return {type:actionTypes.SET_DEFAULT_CREATED};
}

export const getAllGuestBooks = () => {
    return (dispatch) => {
        const cookie = new Cookies();
        doRequest('http://localhost:5000/api/guestbook/show-all','GET',null,{'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.SHOW_ALL_GUESTBOOKS,guestbooks:res}))
            .catch(err => dispatch({type:actionTypes.SHOW_ALL_GUESTBOOKS,err:err}));
    }
}


export const addGuestBook = (data) => {
    return (dispatch) => {
        const cookie = new Cookies();
        const body = {
            name:data.name
        }
        doRequest('http://localhost:5000/api/guestbook/create','POST',body,{'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.CREATE_GUESTBOOK,guestbook:res}))
            .catch(err => dispatch({type:actionTypes.CREATE_GUESTBOOK,err:err}));
    };
};

export const getGuestBook = (id,name) => {
    return (dispatch) => {
        const cookie = new Cookies();
        doRequest(`http://localhost:5000/api/message/guestbook/${id}`,'GET',{'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.SHOW_GUESTBOOK,name:name,messages:res,id:id}))
            .catch(err => dispatch({type:actionTypes.SHOW_GUESTBOOK,err:err}));
    };
}

export const getUser = () => {
    return (dispatch) => {
        const cookie = new Cookies();
        doRequest('http://localhost:5000/api/get-user','GET',null,{'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.GET_USER,user:res.user}))
            .catch(err => dispatch({type:actionTypes.GET_USER,err:err}));
    }
}

export const logout = () => {
    const cookie = new Cookies();
    cookie.remove('user-guestbook',{path:'/'});
    return {type:actionTypes.LOGOUT};
};

export const setSelectedGuestBook = (guestbook) => {
    return {type:actionTypes.SET_GUESTBOOK,guestbook:guestbook};
}

export const showMessages = (id) => {
    return (dispatch) => {
        const cookie = new Cookies();
        doRequest(`http://localhost:5000/api/message/guestbook/${id}`,'GET',null,{'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.SHOW_MESSAGES,messages:res}))
            .catch(err => dispatch({type:actionTypes.SHOW_MESSAGES,err:err}));
    };
}

export const writeMessage = (text,guestbookId) => {
    return (dispatch) => {
        const cookie = new Cookies();
        const body = {
            text:text,
            guestBook:guestbookId
        }
        doRequest('http://localhost:5000/api/message/create','POST',body,{'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.CREATE_MESSAGE,message:res}))
            .catch(err => dispatch({type:actionTypes.CREATE_MESSAGE,err:err}))
    };
}

export const reply = (text, messageId) => {
    return (dispatch) => {
        const cookie = new Cookies();
        const body = {
            messageId:messageId,
            text:text
        }
        doRequest('http://localhost:5000/api/message/add-reply','POST',body, {'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.REPLY_MESSAGE,message:res}))
            .catch(err => dispatch({type:actionTypes.REPLY_MESSAGE,err:err}))
    } ;
}

export const deleteMessage = (messageId) => {
    return (dispatch) => {
        const cookie = new Cookies();
        doRequest(`http://localhost:5000/api/message/${messageId}/delete`,'GET',null,{'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.DELETE_MESSAGE,messageId:messageId}))
            .catch(err => dispatch({type:actionTypes.DELETE_MESSAGE,err:err}))
    };
}

export const inviteUser = (username,guestBookId) => {
    return (dispatch) => {
        const body = {
            username:username,
            guestBookId:guestBookId
        }
        const cookie = new Cookies();
        doRequest('http://localhost:5000/api/guestbook/invite-user','POST',body,{'x-access-token':cookie.get('user-guestbook')})
            .then(res => dispatch({type:actionTypes.INVITE_USER,value:res}))
            .catch(err => dispatch({type:actionTypes.INVITE_USER,err:err}))
    };
}
