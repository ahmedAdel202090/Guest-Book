import React, {Component} from 'react';
import * as actionCreator from "../redux/actionsCreator";
import {withRouter, Link,Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {Button, Col, FormGroup, Label, Row} from "reactstrap";
import {Control, Errors, LocalForm} from "react-redux-form";
import * as validator from "../validator";


class UserHome extends Component {
    constructor(props) {
        super(props);
        this.initiated = false;
        this.redirect = false;
    }

    componentWillMount() {
        document.body.style = 'background-color:white';
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.addGuestBook(values);
    }
    showMessages(guestbook){
        this.props.setSelectedGuestBook(guestbook);
        this.redirect = true;
    }
    render() {
        if (!this.initiated) {
            this.initiated = true;
            this.props.getAllGuestBooks();
        }
        else if(this.redirect){
            this.redirect =false;
            return <Redirect to='/messages' />
        }
        const guestbooks = this.props.guestbooks.map(element => {
            return (
                <>
                    <Col md={2} onClick = {() => this.showMessages(element)} className='guestbook'>
                        <h2>{element.name}</h2>
                        <p>{element.isOwner?'Owner':'Guest'}</p>
                    </Col>
                </>
            );
        });
        return (
            <>
                <LocalForm className='m-auto p-sm-5' onSubmit={(values) => this.handleSubmit(values)}>
                    <FormGroup>
                        <Label for="name">Guest Book :</Label>
                        <Control.text
                            model=".name"
                            className="form-control"
                            name="name"
                            id="name"
                            placeholder="Guest Book"
                            validators={
                                {required: validator.required}
                            }
                        />
                        <Errors
                            className="text-danger"
                            model=".name"
                            show="touched"
                            messages={{required: 'please write guest book name.'}}
                        />
                    </FormGroup>
                    <Button type="submit" className="btn btn-primary">Create</Button>
                </LocalForm>
                <Row>
                    {guestbooks}
                </Row>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        guestbooks: state.guestbooks
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGuestBook: (data) => dispatch(actionCreator.addGuestBook(data)),
        getGuestBook: (id) => dispatch(actionCreator.getGuestBook(id)),
        getAllGuestBooks: () => dispatch(actionCreator.getAllGuestBooks()),
        setSelectedGuestBook: (guestbook) => dispatch(actionCreator.setSelectedGuestBook(guestbook))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserHome));