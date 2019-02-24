//import '../recipeCard.css';
import React from 'react';
import Card from 'react-bootstrap/Card';
import chili from '../Assets/chiliConCarne.jpg';

const displayRecipe  = (props) => {
    return (
        <div>

<Card className="recipeCard">
<Card.Img variant="left" src={chili} />
    <Card.Body>
        <Card.Title>"Title"</Card.Title>
        <Card.Text>
            "recipe display"
        </Card.Text>
    </Card.Body>
</Card>
        </div>
    )
}
export default displayRecipe;
//{props.discriptRec}

