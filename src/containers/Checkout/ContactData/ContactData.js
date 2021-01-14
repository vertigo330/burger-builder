import React, {Component} from 'react';

import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axiosInstance from '../../../axios-orders';

import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4
                },
                isValid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                isValid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { key: 'fastest', value: 'fastest', displayValue: 'Fastest' },
                        { key: 'cheapest', value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation: {},
                value: '',
                isValid: true
            }
        },
        loading: false,
        isFormValid: false
    }

    isValid = (rule, value) => {

        let isValid = true;

        if(rule.required) {
            isValid = isValid && value.trim().length > 0;
        }
        
        if(rule.minLength) {
            isValid = isValid && value.trim().length >= rule.minLength;
        }

        if(rule.maxLength) {
            isValid = isValid && value.trim().length <= rule.maxLength;
        }

        return isValid;
    }

    formChangedHandler(event, id){
        const clonedState = {...this.state.orderForm};
        const clonedFormElement = {...clonedState[id]};
        
        clonedFormElement.value = event.target.value;       
        clonedFormElement.isValid = this.isValid(clonedFormElement.validation, clonedFormElement.value);
        
        clonedFormElement.touched = true;
        clonedState[id] = clonedFormElement;

        let formIsValid= true;
        for(let k in clonedState){
            formIsValid = clonedState[k].isValid && formIsValid;
        }
        this.setState({orderForm: clonedState, isFormValid: formIsValid});
    }

    orderClickedHandler = (event) => {
        event.preventDefault();

        let formPostData = {}

        for(let key in this.state.orderForm){
            formPostData[key] = this.state.orderForm[key].value;
        }
        
        this.setState({isLoading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            contactData: formPostData
        };

        axiosInstance.post('orders.json', order)
            .then(resp => {
                console.log(resp)
                this.setState({isLoading: false});
                this.props.history.push('/');
            })
            .catch(ex => {
                console.error(ex)
                this.setState({isLoading: false});
            });
    }

    render() {
        let formElements = [];

        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
            <form onSubmit={this.orderClickedHandler}>
                {formElements.map(el => (
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
                )}                                
                <Button disabled={!this.state.isFormValid} btnType="Success">ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contect Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);