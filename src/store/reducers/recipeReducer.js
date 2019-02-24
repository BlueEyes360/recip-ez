import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    userId: null,
    error: null,
    loading: false,
    count: 0
};

const saveRecipeStart = (state) => {
    return updateObject(state, {error: null, loading: true});
}

const saveRecipeSuccess = (state) => {
    return updateObject(state, {
        error: null,
        loading: false
    });
}

const saveRecipeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const saveRecipeCountStart = (state) => {
    return updateObject(state, {error: null, loading: true});
}

const saveRecipeCountSuccess = (state, action) => {
    return updateObject(state, {count: action.count});

}

const saveRecipeCountFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}



const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SAVE_RECIPE_START: return saveRecipeStart(state, action);
        case actionTypes.SAVE_RECIPE_SUCCESS: return saveRecipeSuccess(state, action);
        case actionTypes.SAVE_RECIPE_FAIL: return saveRecipeFail(state, action);
        case actionTypes.SAVE_RECIPE_GET_COUNT_START: return saveRecipeCountStart(state);
        case actionTypes.SAVE_RECIPE_GET_COUNT_SUCCESS: return saveRecipeCountSuccess(state);
        case actionTypes.SAVE_RECIPE_GET_COUNT_FAIL: return saveRecipeCountFail(state);
        default:
            return state;
    }
};

export default reducer;