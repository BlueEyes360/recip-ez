import React, {Component} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
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
        error: 0,
        count: 0,
        loading: true,
        showForm: false,
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
                    // "content": {encodedOne}
                    "source":{
                        // "imageUri":"https://cnet4.cbsistatic.com/img/vwQOO7UpqbcbW_oOWiPfzzWc0Og=/970x0/2018/04/11/76a26a67-5570-4f3a-bacb-cba839c7df20/gettyimages-944480672.jpg"
                        // "imageUri": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                        // "imageUri": "https://storage.googleapis.com/wzukusers/user-32857987/images/5ac5a109356cdt9b4ccL/20170625_103422.jpg"
                        "imageUri": "https://thewirecutter.com/wp-content/uploads/2018/05/refrigerators-2018-2x1-lowres.jpg"
                    }
                },
                "features":[
                {
                    "type":"LABEL_DETECTION",
                    "maxResults":10
                },
                // {
                    //     "type":"FACE_DETECTION",
                    //     "maxResults":10
                // },
                // {
                    //   "type":"LANDMARK_DETECTION",
                    //   "maxResults":10
                // },
                // {
                //   "type":"LOGO_DETECTION",
                //   "maxResults":10
                // },
                {
                    "type":"TEXT_DETECTION",
                    "maxResults":10
                },
                {
                    "type":"WEB_DETECTION",
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
                    // "content": {encodedTwo}
                    "source":{
                    // "imageUri":"https://cnet4.cbsistatic.com/img/vwQOO7UpqbcbW_oOWiPfzzWc0Og=/970x0/2018/04/11/76a26a67-5570-4f3a-bacb-cba839c7df20/gettyimages-944480672.jpg"
                    // "imageUri": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                    "imageUri": "https://upload.wikimedia.org/wikipedia/commons/0/09/Food_into_a_refrigerator_-_20111002.jpg"
                }
            },
                "features":[
                    {
                        "type":"LABEL_DETECTION",
                        "maxResults":10
                    },
                // {
                    //     "type":"FACE_DETECTION",
                //     "maxResults":10
                // },
                // {
                //   "type":"LANDMARK_DETECTION",
                //   "maxResults":10
                // },
                {
                    "type":"LOGO_DETECTION",
                    "maxResults":10
                },
                {
                    "type":"TEXT_DETECTION",
                    "maxResults":10
                },
                {
                    "type":"WEB_DETECTION",
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
                    // "content": {encodedThree}
                    "source":{
                        // "imageUri":"https://cnet4.cbsistatic.com/img/vwQOO7UpqbcbW_oOWiPfzzWc0Og=/970x0/2018/04/11/76a26a67-5570-4f3a-bacb-cba839c7df20/gettyimages-944480672.jpg"
                    // "imageUri": "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                    "imageUri": "https://kitchenaid-h.assetsadobe.com/is/image/content/dam/business-unit/maytag/en-us/marketing-content/site-assets/page-content/refrigerators-sclp/Images/P140303_5z_SCLP_02.png?$clp-image-desktop$"
                }
            },
                "features":[
                    {
                    "type":"LABEL_DETECTION",
                    "maxResults":10
                },
                // {
                    //     "type":"FACE_DETECTION",
                    //     "maxResults":10
                // },
                // {
                //   "type":"LANDMARK_DETECTION",
                //   "maxResults":10
                // },
                {
                    "type":"LOGO_DETECTION",
                    "maxResults":10
                },
                {
                    "type":"TEXT_DETECTION",
                    "maxResults":10
                },
                {
                    "type":"WEB_DETECTION",
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
            this.setState({response: response.data.responses});
            this.setState({dataGoogle: response.data.responses});
        })
        .catch(error => {
            console.log(error);
            this.setState({error: error});
        });

    }

    doMicrosoftVisionCall = ( imgURL, action, tags ) => {

        let MicroVisCallAPICall = axios.create({
            baseURL: MICROSOFT_VISION_BASE_URL,
            'Access-Control-Allow-Origin': '*',
            'ocp-apim-subscription-key': MICROSOFT_VISION_API_KEY
        });

        let apiURL = '';
        let params = '';
        // let params = '?visualFeatures=Categories,Description,Tags';

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
            this.setState({dataMicro: response.data});
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

        var testIngredients = ['carrot', 'egg'];

        return(
            <Container className="fluid">
                {ingredForm}
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
                            onClick={() => this.doMicrosoftCustomCall("https://thewirecutter.com/wp-content/uploads/2018/05/refrigerators-2018-2x1-lowres.jpg", 'orange')}>
                            <Image src={cameraImage} rounded />
                        </Button>
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                        <Button
                        variant="light"
                        onClick={this.toggleShowIngredients}>
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