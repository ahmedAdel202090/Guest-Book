import Cookies from 'universal-cookie';

export default class Actions {
    constructor(state){
        this.state = JSON.parse(JSON.stringify(state));
        this.register = this.register.bind(this);
        this.setCreated = this.setCreated.bind(this);
        this.setUser = this.setUser.bind(this);
        this.login = this.login.bind(this);
        this.showAllGuestBooks = this.showAllGuestBooks.bind(this);
    }
    register(user,err){
        if(err){
            this.state.created = {
                valid:false,
                error:err.message
            };
            return this.state;
        }
        this.state.created = {
            valid:true,
            user:user
        };
        return this.state;
    }
    login(value,err){
        if(err){
            this.state.user = {
                auth:false,
                error:err.message
            }

        }
        else if(value.auth){
            this.state.user = {
                username:value.username,
                name:value.name,
                id:value.id,
                auth:true
            }
            const cookie = new Cookies();
            cookie.set('user-guestbook', value.token, { path: '/' });
        }
        else{
            this.state.user = {
                auth:false,
                error:value.message
            }
        }
        return this.state;
    }
    setUser(user){
        this.state.user = user;
        return this.state;
    }
    setCreated(created){
        this.state.created = created;
        return this.state;
    }

    showAllGuestBooks(guestBooks, err) {
        if(err){
            return this.state;
        }
        this.state.guestbooks = guestBooks;
        return this.state;
    }
    addGuestBook(guestbook,err){
        if(err){
            return this.state;
        }

        this.state.guestbooks.push({isOwner:true,...guestbook});
        return this.state;
    }
    getGuestBook(messages,id,name,err){
        if(err){
            return this.state;
        }
        this.state.selectedGuestBook={
            name:name,
            id:id,
            messages:messages
        };
        return this.state;
    }
    loginUser(user,err){
        if(err){
            return this.state;
        }
        this.state.user = user;
        return this.state;
    }
    logout(){
        this.state.user = null;
        return this.state;
    }
    setSelectedGuestBook(guestbook){
        this.state.selectedGuestBook = {guestbook:guestbook,messages:[]};
        return this.state;
    }
    showMessages(messages,err){
        if(err || this.state.selectedGuestBook === null){
            return this.state;
        }
        this.state.selectedGuestBook.messages = messages;
        return this.state;
    }

    createMessage(message, err) {
        if(err || this.state.selectedGuestBook === null){
            return this.state;
        }
        this.state.selectedGuestBook.messages.push(message);
        return this.state;
    }
    reply(message,err){
        if(err || this.state.selectedGuestBook === null){
            return this.state;
        }
        this.state.selectedGuestBook.messages = this.state.selectedGuestBook.messages.map(message1 => {
            if(message1._id === message._id){
                return message;
            }
            return message1;
        });
        return this.state;
    }
    deleteMessage(messageId,err){
        if(err || this.state.selectedGuestBook === null){
            return this.state;
        }
        const idx = this.state.selectedGuestBook.messages.findIndex(message => message._id === messageId);
        this.state.selectedGuestBook.messages.splice(idx,idx >= 0 ? 1 : 0);
        return this.state;
    }
    inviteUser(value,err){
        if(err || value === null){
            this.state.invitedUser = {
                error:err.message
            }
            return this.state;
        }
        this.state.invitedUser = value;
        return this.state;
    }
}