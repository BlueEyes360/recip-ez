import React, { Component } from 'react'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class UI extends Component {

    render() {
        return (

            <Container className="fluid">
                <Row>
                    <Col xs="2"> Ingredients </Col>
                    <Col xs="2"> Blank </Col>
                    <Col xs="2"> Cam </Col>
                    <Col xs="2"> Blank </Col>
                    <Col xs="2"> Get Recipes </Col>
                </Row>
            </Container>
        );
    }

}
export default UI;