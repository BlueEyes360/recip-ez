import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    showIngredForm: false,
    showRecipeCard: false,
    showHome: true
};

const showHome = (state, action) => {
    return updateObject(state, {showHome: true});
};

const showIngredientsForm = (state, action) => {
    return updateObject(state, {showIngredientsForm: !this.state.showIngredForm});
};

const showRecipe = (state, action) => {
    return updateObject(state, {showRecipeCard: !this.state.showRecipeCard});
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SHOW_HOME: return showHome(state, action);
        case actionTypes.SHOW_RECIPE: return showRecipe(state, action);
        case actionTypes.SHOW_INGRED_FORM: return showIngredientsForm(state, action);
        default:
            return state;
    }
};

export default reducer;