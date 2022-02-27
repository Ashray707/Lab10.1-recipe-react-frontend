import React, { Component } from 'react';
import Form from './Form';
import List from './List';
import * as apiCalls from './api';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
    }

    this.handleSave = this.handleSave.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount() {
    console.log("App this.props: ", this.props)
    this.loadRecipes();
  }

  async loadRecipes() {
    const recipes = await apiCalls.getRecipes();
    console.log("App loadRecipes: ", recipes);
    this.setState({ recipes });
  }

  async handleSave(recipe) {
    console.log("App, handleSave : ", recipe)
    const newRecipe = await apiCalls.createRecipe(recipe);
    this.setState({ recipes: [...this.state.recipes, newRecipe] });
  }
 
  async onDelete(id) {
    await apiCalls.removeRecipe(id);
    const recipes = this.state.recipes.filter(r => r.id !== id);
    this.setState({ recipes });
  }

  render() {

    return (
      <div className="App">
        <Form
          onSave={this.handleSave}
        />
        <List onDelete={this.onDelete} recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
