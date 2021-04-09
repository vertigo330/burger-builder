import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as action from '../../store/actions/index';
import { checkValidity } from '../../shared/Utility';

class Auth extends Component {

    state = {
        isSignup: true,
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                isValid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                isValid: false,
                touched: false
            }
        }
    }

    formChangedHandler = (event, id) => {
        const updatedForm = {
            ...this.state.authForm,
            [id]: {
                ...this.state.authForm[id],
                value: event.target.value,
                touched: true,
                isValid: checkValidity(this.state.authForm[id].validation, event.target.value)
            }
        }

        this.setState({authForm: updatedForm});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.authForm.email.value, this.state.authForm.password.value, this.state.isSignup);
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup}
        });
    }

    render() {
        
        let formElements = [];

        for(let key in this.state.authForm){
            formElements.push({
                id: key,
                config: this.state.authForm[key]
            });
        }

        let form = formElements.map(el => (
            <Input 
                key={el.id}
                elementType={el.config.elementType} 
                elementConfig={el.config.elementConfig} 
                value={el.config.value}
                shouldValidate = {el.config.validation}
                touched = {el.config.touched}
                invalid={!el.config.isValid}
                changed={event=>this.formChangedHandler(event, el.id)}
        />)
        )

        if(this.props.loading)
        {
            form = <Spinner />
        }

        let authenticatedRedirect = null;
        if(this.props.isAuthenticated) {
            if(this.props.isBuilding) {
                authenticatedRedirect = <Redirect to="/checkout" />
            }
            else {
                authenticatedRedirect = <Redirect to="/" />
            }
        }

        let errorMsg = null;
        if(this.props.error){
            errorMsg = (
                <p>
                    {this.props.error.message}
                </p>
            )
        }

        return (
                <div className={classes.Auth}>
                    {
                        authenticatedRedirect
                    }
                    {
                        errorMsg
                    }
                    <form onSubmit={this.submitHandler}>
                        {
                            form
                        }
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                    <Button btnType="Danger" clicked={this.switchModeHandler}>{this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        isBuilding: state.burgerBuilder.building
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) => dispatch(action.authenticate(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);