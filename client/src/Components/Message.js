import React, {Component} from 'react';
import * as actionCreator from "../redux/actionsCreator";
import {withRouter, Link, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Control, Errors, LocalForm} from "react-redux-form";
import * as validator from "../validator";
import {Button, FormGroup, Label, Media, Alert, Row, Col} from 'reactstrap';
import icon from '../images/pencil-2.svg';


class Message extends Component {
    constructor(props) {
        super(props);
        this.initiated = false;
    }
    writeMessage(values){
        this.props.writeMessage(values.message,this.props.selectedGuestBook.guestbook._id);
    }
    reply(values,messageId){
        this.props.reply(values.comment,messageId);
    }
    inviteUser(data,guestBookId){
        this.props.inviteUser(data.username,guestBookId);
    }
    render() {
        if (!this.initiated && this.props.selectedGuestBook != null) {
            this.initiated = true;
            this.props.showMessages(this.props.selectedGuestBook.guestbook._id);
            return (<></>);
        }
        else if(this.props.selectedGuestBook === null){
            return <Redirect to='/' />;
        }

        let alert = <></>;
        if (this.props.invitedUser && this.props.invitedUser.notFound) {
            alert = <Alert color="danger">{this.props.invitedUser.message}</Alert>;
        }
        else if(this.props.invitedUser && !this.props.invitedUser.notFound ){
            alert = <Alert color="success">successfully invited</Alert>
        }
        const isOwner = this.props.selectedGuestBook.guestbook.isOwner;
        const userId = this.props.user.id;
        const messages = this.props.selectedGuestBook.messages.map(message => {
            const comments = message.comments.map(comment => {
                return (
                    <>
                        <Row className='message-comment'>
                            <Media className="ml-5">
                                <Media>
                                    <Media left top>
                                        <Media tag="img" src={icon} width={20} height={20}
                                               alt="Generic placeholder image"/>
                                    </Media>
                                    <Media body className="ml-3">
                                        <h6>{comment.user.name}</h6>
                                        <span className="ml-3">{comment.text}</span>
                                    </Media>
                                </Media>
                            </Media>
                        </Row>
                    </>
                );
            });
            let editAndUpdate = <></>
            if(message.user._id === userId){
                editAndUpdate = (
                    <>
                        <span className="ml-3"> <Button color="primary">Edit</Button> </span>
                        <span className="ml-3"> <Button color="danger" onClick={() => this.props.deleteMessage(message._id)}>Delete</Button> </span>
                    </>
                );
            }
            else if(isOwner){
                editAndUpdate = (
                    <>
                        <span className="ml-3" onClick={() => this.props.deleteMessage(message._id)}> <Button color="danger">Delete</Button> </span>
                    </>
                );
            }
            return (
                <>
                    <Row>
                        <Col>
                            <Row className='message'>
                                <Media className="ml-3">
                                    <Media>
                                        <Media left top>
                                            <Media tag="img" src={icon} width={50} height={50}
                                                   alt="Generic placeholder image"/>
                                        </Media>
                                        <Media body className="ml-3">
                                            <Media heading>{message.user.name}
                                                {editAndUpdate}
                                            </Media>
                                            <div className="ml-3 mt-2">{message.text}</div>
                                        </Media>
                                    </Media>
                                </Media>
                            </Row>
                            {comments}

                            <Row className='message-reply'>
                                <LocalForm className='p-sm-3' onSubmit={(values) => this.reply(values,message._id)}>
                                    <FormGroup className='row'>
                                        <Control.text
                                            model=".comment"
                                            className="form-control reply col-6"
                                            name="comment"
                                            id="comment"
                                            placeholder="Reply"
                                            validators={
                                                {required: validator.required}
                                            }
                                        />
                                        <div className='col-4'><Button type="submit"
                                                                       className="btn btn-primary">send</Button></div>
                                        <Errors
                                            className="text-danger"
                                            model=".comment"
                                            show="touched"
                                            messages={{required: 'please add reply.'}}
                                        />
                                    </FormGroup>
                                </LocalForm>
                            </Row>

                        </Col>
                    </Row>

                </>
            );
        });
        return (
            <>
                <Row className='ml-2'>
                    <Col sm={4}>
                        <LocalForm className='p-sm-3' onSubmit={(values) => this.inviteUser(values,this.props.selectedGuestBook.guestbook._id)}>
                            <FormGroup>
                                {alert}
                                <Label for="username">Invite User</Label>
                                <Control.text
                                    model=".username"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    placeholder="enter username"
                                    validators={
                                        {required: validator.required}
                                    }
                                />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages={{required: 'please write username.'}}
                                />
                            </FormGroup>
                            <span><Button type="submit" className="btn btn-primary">invite</Button></span>
                        </LocalForm>
                    </Col>
                    <Col sm={7}>
                        <LocalForm className='p-sm-3' onSubmit={(values) => this.writeMessage(values)}>
                            <FormGroup>
                                <Label for="message">Write Message</Label>
                                <Control.textarea
                                    cols={40}
                                    rows={8}
                                    model=".message"
                                    className="form-control"
                                    name="message"
                                    id="message"
                                    placeholder="write your message"
                                    validators={
                                        {required: validator.required}
                                    }
                                />
                                <Errors
                                    className="text-danger"
                                    model=".message"
                                    show="touched"
                                    messages={{required: 'please write Message.'}}
                                />
                            </FormGroup>
                            <span><Button type="submit" className="btn btn-primary">send</Button></span>
                        </LocalForm>
                    </Col>
                </Row>
                {messages}


            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        selectedGuestBook: state.selectedGuestBook,
        invitedUser:state.invitedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        showMessages: (id) => dispatch(actionCreator.showMessages(id)),
        writeMessage: (text,guestbookId) => dispatch(actionCreator.writeMessage(text,guestbookId)),
        reply: (text,messageId) => dispatch(actionCreator.reply(text,messageId)),
        deleteMessage: (messageId) => dispatch(actionCreator.deleteMessage(messageId)),
        inviteUser: (username,guestBookId) => dispatch(actionCreator.inviteUser(username,guestBookId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Message));