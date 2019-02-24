import React, { Component } from 'react';
import RecipUI from './RecipeUI/RecipUI.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <RecipUI 
        title={"Vegetable-Pasta Oven Omelet"} 
        picture={"http://img.recipepuppy.com/560556.jpg"}
        recipeWeb={"http://killerchip.net/2018/07/01/2018-07-01-react-begineer-cheatsheet"}
        ingredients={"tomato, onions, red pepper, garlic, olive oil, zucchini, cream cheese, vermicelli, eggs, parmesan cheese, milk, italian seasoning, salt, black pepper"}
        />
                <RecipUI 
        title={"Vegetable-Pasta Oven Omelet"} 
        picture={"http://img.recipepuppy.com/560556.jpg"}
        recipeWeb={"http://killerchip.net/2018/07/01/2018-07-01-react-begineer-cheatsheet"}
        ingredients={"tomato, onions, red pepper, garlic, olive oil, zucchini, cream cheese, vermicelli, eggs, parmesan cheese, milk, italian seasoning, salt, black pepper"}
        />
                <RecipUI 
        title={"Vegetable-Pasta Oven Omelet"} 
        picture={"http://img.recipepuppy.com/560556.jpg"}
        recipeWeb={"http://killerchip.net/2018/07/01/2018-07-01-react-begineer-cheatsheet"}
        ingredients={"tomato, onions, red pepper, garlic, olive oil, zucchini, cream cheese, vermicelli, eggs, parmesan cheese, milk, italian seasoning, salt, black pepper"}
        />
      </div>
    );
  }
}

export default App;
