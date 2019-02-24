
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import {FIREBASE_BASE_URL, GOOGLE_API_KEY, MICROSOFT_VISION_API_KEY, MICROSOFT_VISION_BASE_URL} from './APIKeys';

import AppNav from './components/AppNav';
import UI from './UI/UI';

class App extends Component {
  render() {
  }

    state = {
        dataMicro: 0,
        dataGoogle: 0,
        error: 0,
        count: 0,
        loading: true,
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

        // this.callSavedData("vision_tests", GOOGLE);
        // this.callSavedData("micro_vision_tests", MICROSOFT);
    }

    componentDidMount() {
        this.props.onTryAutoSignIn();
    }

    render() {

        return (
        <div className="App">
            <AppNav />
            <UI />
        </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
