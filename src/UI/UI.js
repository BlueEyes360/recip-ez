import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import ingredientImage from './assets/ingredientPic.png';
import cameraImage from './assets/Camera.png';
import recipeImage from './assets/Recipes.png';

class UI extends Component {
    render() {
        return(
            <Container className="fluid">
               <Row>     
                    <Col xs={4}>
                        <Button variant="outline-secondary"> 
                            <p className="font-weight-bolder"> INGREDIENTS </p>                            
                            <Image src={ingredientImage} rounded />
                        </Button>
                    </Col> 
                    <Col xs={4}> 
                        <Button variant="outine-secondary">
                            <Image src={cameraImage} rounded />
                        </Button>
                    </Col>
                    <Col xs={4}>
                        <Button variant="outline-secondary">
                            <p className="font-weight-bolder"> RECIPES </p>                            
                            <Image src={recipeImage} rounded />
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default UI;