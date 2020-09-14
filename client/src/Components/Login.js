import React, {Component} from 'react';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Button, FormGroup, Label,Media, Alert} from 'reactstrap';
import * as validator from '../validator';
import {Link, withRouter} from 'react-router-dom';
import * as actionCreator from "../redux/actionsCreator";
import {connect} from "react-redux";


class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount() {
        document.body.style = 'background-color: #09c';
    }
    handleSubmit(values) {
        this.props.login(values);
    }
    render() {
        let alert = <></>;
        if (this.props.user && !this.props.user.auth) {
            alert = <Alert color="danger">{this.props.user.error}</Alert>;
        }
        return (
            <>
                <Media className="m-auto col-3 media-form">
                    <Media body >
                        <h3 className='title'>Login</h3>
                        {alert}
                        <LocalForm className='m-auto p-sm-5' onSubmit={(values) => this.handleSubmit(values)}>
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
                            <span> if you don't have an account , <Link to='/register'>SignUp</Link> </span>
                        </LocalForm>
                    </Media>
                </Media>
            </>);
    }

}
const mapStateToProps = (state) => {
    return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (data) => dispatch(actionCreator.login(data))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));