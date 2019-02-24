import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';


import ingredientImage from './assets/ingredientPic.png';
import cameraImage from './assets/Camera.png';
import recipeImage from './assets/Recipes.png';

function simulateLoadingImage() {
    return new Promise(resolve => setTimeout(resolve, 2000) );
}

class UI extends Component {
    constructor(props, context){
        super(props, context);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            isLoading: false, 
        };
    }
    handleClick() {
        this.setState({isLoading: true}, () => {
            simulateLoadingImage().then(()=> {
                this.setState({isLoading: false});
            });
        });
    }
    render() {
        const { isLoading } = this.state;
        return(
            <Container className="fluid">
               <Navbar bg ="dark" varient="dark" className="fixed-bottom">     
                    <Col xs={4} className="d-flex justify-content-center">
                        <Button variant="light"> 
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
            </Container>
        );
    }
}
export default UI;