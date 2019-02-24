import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

import {FIREBASE_BASE_URL, GOOGLE_API_KEY, MICROSOFT_VISION_API_KEY, MICROSOFT_VISION_BASE_URL, MICROSOFT_CUSTOM_URL, MICROSOFT_CUSTOM_API_KEY} from '../APIKeys';

import IngredientForm from '../containers/IngredientForm/IngredientForm';

import ingredientImage from './assets/ingredientPic.png';
import cameraImage from './assets/Camera.png';
import recipeImage from './assets/Recipes.png';

const fetch = require('node-fetch');

const GOOGLE = true;
const MICROSOFT = false;

class UI extends Component {
    state = {
        dataMicro: 0,
        dataGoogle: 0,
        count: 0,
        showForm: false,
        showRecipes: false,
        ingredientList: []
    }

    doVisionAPICall = () => {

        let VisAPIInstance = axios.create({
            baseURL: 'https://vision.googleapis.com/v1/images:annotate?key=' + GOOGLE_API_KEY,
        'Access-Control-Allow-Origin': '*'
    });

        VisAPIInstance.post('',
        {
            "requests":[
                {
                "image":{
                    "source":{
                        "imageUri": "https://thewirecutter.com/wp-content/uploads/2018/05/refrigerators-2018-2x1-lowres.jpg"
                    }
                },
                "features":[
                {
                    "type":"LABEL_DETECTION",
                    "maxResults":10
                },
                {
                    "type":"OBJECT_LOCALIZATION",
                    "maxResults":10
                },
                {
                    "type":"IMAGE_PROPERTIES",
                    "maxResults":10
                }
            ]
            },
            {
                "image":{
                    "source":{
                    "imageUri": "https://upload.wikimedia.org/wikipedia/commons/0/09/Food_into_a_refrigerator_-_20111002.jpg"
                }
            },
                "features":[
                    {
                        "type":"LABEL_DETECTION",
                        "maxResults":10
                    },
                    {
                        "type":"OBJECT_LOCALIZATION",
                        "maxResults":10
                    },
                    {
                        "type":"IMAGE_PROPERTIES",
                        "maxResults":10
                    }
                ]
            },
            {
                "image":{
                    "source":{
                    "imageUri": "https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/maytag/en-us/marketing-content/site-assets/page-content/refrigerators-sclp/Images/P140303_5z_SCLP_02.png?$clp-image-desktop$"
                }
            },
                "features":[
                    {
                    "type":"LABEL_DETECTION",
                    "maxResults":10
                },
                {
                    "type":"OBJECT_LOCALIZATION",
                    "maxResults":10
                },
                {
                    "type":"IMAGE_PROPERTIES",
                    "maxResults":10
                }
                ]
            }
        ]
    })
        .then(response => {
            console.log(response);
            this.setState({dataGoogle: response.data.responses});
        })
        .catch(error => {
            console.log(error);
            this.setState({error: error});
        });

    }

    doMicrosoftVisionCall = ( imgURL, action ) => {

        let MicroVisCallAPICall = axios.create({
            baseURL: MICROSOFT_VISION_BASE_URL,
            'Access-Control-Allow-Origin': '*',
            'ocp-apim-subscription-key': MICROSOFT_VISION_API_KEY
        });

        let apiURL = '';
        let params = '';

        if( action === 'detect' )
        {
            apiURL = 'detect?&subscription-key=' + MICROSOFT_VISION_API_KEY
        }
        else if ( action === 'analyze' )
        {
            params = '?visualFeatures=Categories,Description,Tags';
            apiURL = 'analyze' + params + '&subscription-key=' + MICROSOFT_VISION_API_KEY;
        }

        MicroVisCallAPICall.post(apiURL,
            {"url": imgURL})
            .then(response => {
                console.log(response);
                this.setState({dataMicro: response.data.objects});
            })
            .catch(error => {
                console.log(error);
                this.setState({error: this.error});
            });
    }

    doMicrosoftCustomCall = ( imgURL, tags ) => {

        let MicroVisCallAPICall = axios.create({
            baseURL: MICROSOFT_CUSTOM_URL,
            'Access-Control-Allow-Origin': '*',
            'Ocp-Apim-Subscription-Key': MICROSOFT_CUSTOM_API_KEY
        });

        let params = '';

    MicroVisCallAPICall.post("",
        {"url": imgURL})
        .then(response => {
            console.log(response);
            this.setState({dataMicro: response.data});
        })
        .catch(error => {
            console.log(error);
            this.setState({error: this.error});
        });

    }

    doubleVisionCall = (imgURL, action) => {
        this.doMicrosoftVisionCall(imgURL, action);
        this.doVisionAPICall();
    }

    toggleShowIngredients = () => {
        let truth = !this.state.showForm;
        this.setState({showForm: truth});
    }

    toggleShowRecipe = () => {
        let truth = !this.state.showRecipes;
        this.setState({showRecipes: truth});
    }

    myCallBackFromForm = (dataFromChild) => {
        this.setState({ingredientList: dataFromChild});
    }

    render() {
        const { isLoading } = this.state;

        let ingredForm = null;

        if(this.state.showForm === true){
            ingredForm = <IngredientForm callbackFromParent={this.myCallBackFromForm} />;
        }

        let display = null;

        if(this.state.showRecipes === true){
            display = (
                <div>
                    <Card className="recipeCard">
                    <Card.Img src={this.props.picture} Transformation width="250" height="250" gravity="faces" crop="fill" />
                        <Card.Body>
                            <Card.Title>{this.props.title}</Card.Title>
                            <Card.Text>
                                Food2Fork Popularity Rank: 
                                <p>{this.props.socialRank}</p>
                            </Card.Text>
                            <Button onClick={() => this.clickHome()}>Home</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                            <Button href={this.props.recipeWeb} >Recipe</Button>
                        </Card.Body>
                    </Card>
                </div>
            )
        }

        return(
            <Container className="fluid">
                {ingredForm}
                {display}
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
                            onClick={() => this.doubleVisionCall("https://thewirecutter.com/wp-content/uploads/2018/05/refrigerators-2018-2x1-lowres.jpg", 'detect')}>
                            <Image src={cameraImage} rounded />
                        </Button>
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                        <Button
                        variant="light"
                        onClick={() => this.toggleShowRecipe()}>
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