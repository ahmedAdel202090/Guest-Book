import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import Login from './Components/Login';
import Register from "./Components/Register";
import Cookies from 'universal-cookie';
import {connect} from "react-redux";
import UserHome from "./Components/UserHome";
import NavBar from "./Components/NavBar";
import * as actionCreator from "./redux/actionsCreator";
import Message from "./Components/Message";

const cookie = new Cookies();

class Main extends Component {
    render() {
        if (cookie.get('user-guestbook')) {
            if(this.props.user === null){
                this.props.getUser();
                return (<></>);
            }
            return (
                <>
                    <NavBar logout = {this.props.logout} user={this.props.user}/>
                    <Switch>
                        <Route path='/' exact>
                            <UserHome/>
                        </Route>
                        <Route path='/messages' exact>
                            <Message/>
                        </Route>
                        <Route path='/*'>
                            <h3>Error:Not Expected Path</h3>
                        </Route>
                    </Switch>
                </>
            );
        }
        return (
            <>
                <Switch>
                    <Route path='/' exact>
                        <Login/>
                    </Route>
                    <Route path='/register' exact>
                        <Register/>
                    </Route>
                    <Route path='/*'>
                        <h3>Error:Not Expected Path</h3>
                    </Route>
                </Switch>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return { user: state.user };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(actionCreator.getUser()),
        logout: () => dispatch(actionCreator.logout())
    };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));