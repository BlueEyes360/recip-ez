import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';

import IngredientForm from '../containers/IngredientForm/IngredientForm';

import ingredientImage from './assets/ingredientPic.png';
import cameraImage from './assets/Camera.png';
import recipeImage from './assets/Recipes.png';


class UI extends Component {
    state = {
        showForm: false,
    }
    toggleShowIngredients = () => {
        let truth = !this.state.showForm;
        this.setState({showForm: truth});
    }

    render() {
        const { isLoading } = this.state;

        let ingredForm = null;

        if(this.state.showForm === true){
            ingredForm = <IngredientForm />;
        }


        return(
            <Container className="fluid">
                <Navbar bg ="dark" varient="dark" className="fixed-bottom">
                    <Col xs={4} className="d-flex justify-content-center">
                        <Button
                            onClick={() => this.toggleShowIngredients()}
                            variant="light">
                            <p className="font-weight-bolder"> </p>
                            <Image src={ingredientImage} rounded />
                        </Button>
                    </Col> 
                    <Col xs={4} className="d-flex justify-content-center"> 
                        <Button 
                            variant="light"
                            disabled={isLoading}
                            onClick={!isLoading ? this.handleClick : null }>
                            <Image src={cameraImage} rounded />
                        </Button>
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                        <Button variant="light">
                            <p className="font-weight-bolder"> </p>                            
                            <Image src={recipeImage} rounded />
                        </Button>
                    </Col>
                </Navbar>
                {ingredForm}
            </Container>
        );
    }
}


export default UI;