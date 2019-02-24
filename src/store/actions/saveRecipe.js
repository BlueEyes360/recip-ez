import axios from 'axios';

import * as actionTypes from './actionTypes';

import { AUTHENTICATION_API_KEY, FIREBASE_BASE_URL } from '../../APIKeys';

export const saveRecipeStart = () => {
    return {
        type: actionTypes.SAVE_RECIPE_START
    }
};

export const saveRecipeSuccess = () => {
    return {
        type: actionTypes.SAVE_RECIPE_SUCCESS,
    }
};

export const saveRecipeFail = (error) => {
    return {
        type: actionTypes.SAVE_RECIPE_FAIL,
        error: error
    }
};

export const getSavedRecipeCount = () => {
    return dispatch => {
        dispatch(actionTypes.SAVE_RECIPE_GET_COUNT_START);
        let FirebaseRecipeInstance = axios.create({
            baseURL: FIREBASE_BASE_URL,
            'Access-Control-Allow-Origin': '*'
        });

        let url = "/" + localStorage.userId + "/" + this.count + ".json";

        FirebaseRecipeInstance.get(url)
        .then(response => {
            dispatch(actionTypes.SAVE_RECIPE_GET_COUNT_SUCCESS);
            dispatch(saveRecipe({}, response.data));
            console.log("GSC");
            // console.log(response);
        })
        .catch(function (error) {
            dispatch(actionTypes.SAVE_RECIPE_GET_COUNT_FAIL);
            console.log(error);
        });

    }
};

export const saveRecipeWrapper = (count, recipe) => {
    return dispatch => {
        dispatch(getSavedRecipeCount());
        dispatch(saveRecipe(count, recipe));
    }

}

export const saveRecipe = (count, recipe) => {
    return dispatch => {

        const recipeData = {
            recipe: recipe
        }

        let FirebaseRecipeInstance = axios.create({
            baseURL: FIREBASE_BASE_URL,
            'Access-Control-Allow-Origin': '*'
        });

        let url = "/" + localStorage.userId + "/" + count + ".json";
        dispatch(actionTypes.SAVE_RECIPE_START);

        FirebaseRecipeInstance.put(url, recipeData)
            .then(response => {
                console.log(response);
                dispatch(saveRecipeSuccess());
            })
            .catch(err => {
                console.log(err);
                dispatch(saveRecipeFail());
            });
    }
};