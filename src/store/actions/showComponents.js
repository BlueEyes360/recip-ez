import * as actionTypes from './actionTypes';

export const showHome = () => {
    return {
        type: actionTypes.SHOW_HOME
    }
};

export const showRecipe = () => {
    return {
        type: actionTypes.SHOW_RECIPE
    }
};

export const showIngred = () => {
    return {
        type: actionTypes.SHOW_INGRED_FORM
    }
};


export const SHOW_HOME = 'SHOW_HOME';
export const SHOW_RECIPE = 'SHOW_RECIPE';
export const SHOW_INGRED_FORM = 'SHOW_INGRED_FORM';