import React, { Component } from 'react';
import axios from 'axios';

import {FIREBASE_BASE_URL} from '../../APIKeys';

let FirebaseDataInstance = axios.create({
    baseURL: FIREBASE_BASE_URL,
    'Access-Control-Allow-Origin': '*'
});

class ProcessImages extends Component {

    state = {
        data: 0,
        count: 0,
    }

    OutputDataHandler = () => {
        let beginningCount = this.state.count;
        let addedImages = 0;
        // for( let i = 1; i <= 10; i++)
        // {
        let singleImageData = this.props.data;
        // console.log(this.props.data);
        // console.log(singleImageData);
        //     // console.log(singleImageData);
        //     if((singleImageData.hasOwnProperty("title") && singleImageData.title !== null)
        //     && (singleImageData.hasOwnProperty("provenance") && singleImageData.provenance !== null)
        //     && (singleImageData.hasOwnProperty("dated") && singleImageData.dated !== null)
        //     && (singleImageData.hasOwnProperty("creditline") && singleImageData.creditline !== null)
        //     && ((singleImageData.hasOwnProperty("baseimageurl") && singleImageData.baseimageurl !== null)
        //     || (singleImageData.hasOwnProperty("primaryimageurl") && singleImageData.primaryimageurl !== null)))
        //     {
        this.PostImageToServer(singleImageData, (beginningCount + addedImages++));
        //     }
        // }
    }

    PostImageToServer = (imageData, currentCount) => {
        // FirebaseDataInstance.put("/vision_tests/" + currentCount + ".json", imageData)
        FirebaseDataInstance.put(this.props.path + "/" + currentCount + ".json", imageData)
        .then(response => {
            let newCount = this.state.count + 1;
            this.setState({count: newCount});
            this.IncrementServerCount();
            // console.log("PITS");
            // console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }

    GetServerCount = () => {
        FirebaseDataInstance.get(this.props.path + "/count.json")
        .then(response => {
            this.setState({count: response.data});
            // console.log("GSC");
            // console.log(response);
            this.OutputDataHandler();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    IncrementServerCount = () => {
        let currentCount = this.state.count;
        FirebaseDataInstance.put(this.props.path + "/count.json", currentCount)
        .then(response => {
            // console.log("ISC");
            // console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }


    componentDidMount() {
        this.GetServerCount();
    }

    render() {

        return (
            <>

            </>
        )

    }
}

export default ProcessImages;