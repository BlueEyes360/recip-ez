import './recipeCard.css';
import Card from 'react-bootstrap/Card';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
//import DisplayRecip from './DisplayRecipe/DisplayRecip.js';

class displayScreen extends Component {
    state = {
        // card: true,
        homeCard: true,
    }
    
    // clickHandler = () => {
    //     let oldCardValue = this.state.card;
    //     this.setState({card: !oldCardValue});
    // }

    clickHome = () => {
        let oldHomeValue = this.state.homeCard;
        this.setState({homeCard: !oldHomeValue});
    }
    
    render() {

        let display = (
            <div>
                <Card className="recipeCard">
                <Card.Img src={this.props.picture} Transformation width="250" height="250" gravity="faces" crop="fill" />
                    <Card.Body>
                        <Card.Title>{this.props.title}</Card.Title>
                        <Card.Text>
                            {this.props.ingredients}
                        </Card.Text>
                        
                        <Button onClick={() => this.clickHome()}>Home</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <Button href={this.props.recipeWeb} >Recipe</Button>
                    </Card.Body>
                </Card>
            </div>
        )

        // if(this.state.card === false) {
        //     display = (
        //         <Jumbotron>
        //             <h1>{this.props.title}</h1>
        //             <p>
        //                 This is a simple hero unit, a simple jumbotron-style component for calling
        //                 extra attention to featured content or information.
        //             </p>
        //         </Jumbotron>

        //     )
        // }



        if(this.state.homeCard === false) {
            //this should go back to home screen
            
            display = (
                
                <Jumbotron>
                    <h1>Home Button</h1>
                    <p>
                        This is a simple hero unit, a simple jumbotron-style component for calling
                        extra attention to featured content or information.
                    </p>
                </Jumbotron>
            )
        }
        
        return (
            <div>
                {display}
            </div>
        );
    }
}

export default displayScreen;

// variant="top" className = "img-thumbnail"
//href="#"
//onClick={() => this.clickHandler()}