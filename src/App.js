import React, { Component } from 'react';
//import logo from './logo.svg';
import RecipUI from './RecipeUI/RecipUI.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <RecipUI title={"Chili con carne"} mealDisc={"Chili con carne or chilli con carne, meaning \"chili with meat\" and sometimes known as simply \"chili\" or \"chilli\", is a spicy stew containing chili peppers, meat, and often tomatoes and beans. Other seasonings may include garlic, onions, and cumin."}/>
      </div>
    );
  }
}

export default App;
