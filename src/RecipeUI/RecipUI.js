import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import chili from './Assets/chiliConCarne.jpg';

const displayCard  = (props) => {
    return (
        <div>

<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={chili} />
    <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>
            {props.mealDisc}
        </Card.Text>
    </Card.Body>
</Card>
        {/* props.title
        props.descrisption
        props.pic maybe?*/}
        </div>
    )
}
export default displayCard;
//<Button variant="primary">Go somewhere</Button>