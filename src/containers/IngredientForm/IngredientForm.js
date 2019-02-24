import React, { Component } from 'react';
import { connect } from 'react-redux';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Input from '../../components/Forms/Input/Input';
import Loading from '../../components/Loading/Loading';
import * as actions from '../../store/actions/index';

class Auth extends Component {

    state = {
        controls: {
            meats: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "", displayValue: ""},
                        {value: "beef", displayValue: "Beef"},
                        {value: "ribs", displayValue: "Ribs"},
                        {value: "fish", displayValue: "Fish"},
                        {value: "ham", displayValue: "Ham"},
                        {value: "bacon", displayValue: "Bacon"},
                        {value: "steak", displayValue: "Steak"}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                label: 'Meats'
            },
            vegetables: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "", displayValue: ""},
                        {value: "lettuce", displayValue: "Lettuce"},
                        {value: "onion", displayValue: "Onion"},
                        {value: "cucumber", displayValue: "Cucumber"},
                        {value: "tomato", displayValue: "Tomato"},
                        {value: "bean", displayValue: "Beans"},
                        {value: "cabbage", displayValue: "Cabbage"},
                        {value: "carrot", displayValue: "Carrot"},
                        {value: "broccoli", displayValue: "Broccoli"}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                label: 'Vegetables'
            },
            fruit: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "", displayValue: ""},
                        {value: "watermelon", displayValue: "Watermelon"},
                        {value: "apple", displayValue: "Apple"},
                        {value: "banana", displayValue: "Banana"},
                        {value: "pear", displayValue: "Pear"},
                        {value: "orange", displayValue: "Oranges"},
                        {value: "peach", displayValue: "Peach"},
                        {value: "grapefruit", displayValue: "Grapefruit"},
                        {value: "pineapple", displayValue: "Pineapple"}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                label: 'Fruit'
            },
            dairy: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "", displayValue: ""},
                        {value: "butter", displayValue: "Butter"},
                        {value: "cheese", displayValue: "Cheese"},
                        {value: "cream", displayValue: "Cream"},
                        {value: "milk", displayValue: "Milk"}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                label: 'Dairy'
            },
            grains: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: "", displayValue: ""},
                        {value: "wheat", displayValue: "Wheat"},
                        {value: "oat", displayValue: "Oat"},
                        {value: "rice", displayValue: "Rice"},
                        {value: "barley", displayValue: "Barley"}
                    ]
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false,
                label: 'Grains'
            },
        },
        formIsValid: false,
        ingredientsArray: [],
    }

    checkValidity( value, rules ) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedAuthForm = {
            ...this.state.controls
        };
        const updatedAuthElement = {
            ...updatedAuthForm[controlName]
        };
        updatedAuthElement.value = event.target.value;
        updatedAuthElement.valid = this.checkValidity(updatedAuthElement.value, updatedAuthElement.validation);
        updatedAuthElement.touched = true;
        updatedAuthForm[controlName] = updatedAuthElement;

        let formIsValid = true;
        for( let controlName in updatedAuthForm) {
            formIsValid = updatedAuthForm[controlName].valid && formIsValid;
        }

        this.setState({controls: updatedAuthForm, formIsValid: formIsValid});
    }

    submitHandler = () => {
        for(let key in this.state.controls)
        {
            if(this.state.controls[key].value !== '')
            {
                let nextIngredient = this.state.controls[key].value;
                console.log(nextIngredient);
                let newIngArray = this.state.ingredientsArray;

                newIngArray.push(nextIngredient);

                this.setState({ingredientsArray: newIngArray});
                this.props.callbackFromParent(newIngArray);
            }

        }
    }



    render() {

        const formElementsArray = [];
        for( let key in this.state.controls ) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
                label: this.state.controls[key].label
            })
        }

        let form = (formElementsArray.map(formElement => (
            <Input
                label={formElement.label}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation.required}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        )))

        if(this.props.loading) {
            form = <Loading />
        }

        let errorMessage = null;

        if(this.props.error) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        let button = <Button onClick={this.submitHandler} variant="primary" >Add Ingredients</Button>;

        return (
            <>
                <Jumbotron className="fluid h-100">
                    {errorMessage}
                    {form}
                    {button}
                </Jumbotron>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);