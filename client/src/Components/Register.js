import React, {Component} from 'react';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Button, FormGroup, Label,Media, Alert} from 'reactstrap';
import * as validator from '../validator';
import  {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreator from '../redux/actionsCreator';
import { withRouter } from 'react-router-dom';


class Register extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        document.body.style = 'background-color: #09c';
        this.props.setCreatedNull();
    }
    handleSubmit(values) {
        this.props.register(values);
    }
    render() {
        let alert = <></>;
        if (this.props.created && this.props.created.valid) {
            alert = <Alert color="success">thank You {this.props.created.user.name}, Registered Sucessfuly</Alert>;
        }
        else if (this.props.created && !this.props.created.valid) {
            alert = <Alert color="danger">Sorry there is some Wrong in Submision "{this.props.created.error}"</Alert>;
        }
        return (
            <>
                <Media className="m-auto col-3 media-form">
                    <Media body >
                        <h3 className='title'>Register</h3>
                        {alert}
                        <LocalForm className='m-auto p-sm-5' onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label for="name">Name :</Label>
                                <Control.text
                                    model=".name"
                                    className="form-control"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Your Name"
                                    validators={
                                        {required: validator.required,isName:validator.isName}
                                    }
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{required: 'Name is required .',isName: 'name should be started with Capital letter like A not a and at least length 3'}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="username">User Name :</Label>
                                <Control.text
                                    model=".username"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    placeholder="User Name"
                                    validators={
                                        {required: validator.required}
                                    }
                                />
                                <Errors
                                    className="text-danger"
                                    model=".username"
                                    show="touched"
                                    messages={{required: 'username is required .'}}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password :</Label>
                                <Control
                                    type="password"
                                    model=".password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    validators={{required: validator.required}}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".password"
                                    show="touched"
                                    messages={{required: 'password is required .'}}
                                />
                            </FormGroup>
                            <Button type="submit" className="btn btn-primary">Submit</Button>
                            <span> if you have an account , <Link to='/'>Sign In</Link> </span>
                        </LocalForm>
                    </Media>
                </Media>
            </>);
    }

}
const mapStateToProps = (state) => {
    return { created: state.created }
};

const mapDispatchToProps = (dispatch) => {
    return {
        register: (data) => dispatch(actionCreator.register(data)),
        setCreatedNull: () => dispatch(actionCreator.setCreatedNull())
    };
};
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(Register));