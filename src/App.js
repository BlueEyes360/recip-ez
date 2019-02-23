import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import {FIREBASE_BASE_URL, GOOGLE_API_KEY, MICROSOFT_VISION_API_KEY, MICROSOFT_VISION_BASE_URL} from './APIKeys';

const GOOGLE = true;
const MICROSOFT = false;


class App extends Component {
render() {

    state = {
        dataMicro: 0,
        dataGoogle: 0,
        error: 0,
        count: 0,
        loading: 0
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
                    "source":{
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
                    "source":{
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
        // MicroVisCallAPICall.post('detect?&subscription-key=' + MICROSOFT_VISION_API_KEY,
        // MicroVisCallAPICall.post('analyze' + params + '&subscription-key=' + MICROSOFT_VISION_API_KEY,
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


    return (

    );
}
}

export default App;