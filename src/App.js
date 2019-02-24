import React, { Component } from 'react';
import axios from 'axios';
// import ProcessImages from './containers/ProcessImages/ProcessImages';
import './App.css';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import {FIREBASE_BASE_URL, GOOGLE_API_KEY, MICROSOFT_VISION_API_KEY, MICROSOFT_VISION_BASE_URL} from './APIKeys';

import AppNav from './components/AppNav';


// import VisionAPI from './components/VisionAPI/VisionAPI';
const GOOGLE = true;
const MICROSOFT = false;

class App extends Component {

    state = {
        dataMicro: 0,
        dataGoogle: 0,
        error: 0,
        count: 0,
        loading: true,
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

    doMicrosoftVisionCall = ( imgURL, action ) => {

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

    callSavedData = ( path, isGoogle ) => {
        let SavedDataInstance = axios.create({
            baseURL: FIREBASE_BASE_URL,
            'Access-Control-Allow-Origin': '*'
            });

        SavedDataInstance.get(path + "/1.json")
        .then(response => {
            console.log(response);
            if(isGoogle === true)
            {
                this.setState({dataGoogle: response.data});
            }else
            {
                this.setState({dataMicro: response.data});
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentWillMount() {

        // this.doVisionAPICall();
        // this.doMicrosoftVisionCall("https://thewirecutter.com/wp-content/uploads/2018/05/refrigerators-2018-2x1-lowres.jpg", 'detect');

        this.callSavedData("vision_tests", GOOGLE);
        this.callSavedData("micro_vision_tests", MICROSOFT);
    }

    componentDidMount() {
        this.props.onTryAutoSignUp();
    }

    render() {

        return (
        <div className="App">
            <AppNav />
        </div>
        );

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actions.authCheckState()),
    };
};

export default connect(null, mapDispatchToProps)(App);