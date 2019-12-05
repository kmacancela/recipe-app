import React, {useEffect, useState} from 'react';
import '../App.css';

const SavedRecipes = ({props, user, savedRecipes, setSavedRecipes, getSavedRecipes}) => {

  useEffect(() => {
    getSavedRecipes()
  }, [])

  const updateRating = (rating, recipe) => {
    fetch(`http://localhost:3000/saved/${recipe}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({rating: rating})
    })
      .then(r => r.json())
      .then(data => {
        getSavedRecipes()
      })
  }

  const editRating = (e) => {
    e.preventDefault()
    let new_rating = parseInt(e.target.new_rating.value)
    let target_recipe = e.target.recipe.value
    updateRating(new_rating, target_recipe)
  }

  const deleteSaved = (e) => {
    let recipe_id = e.target.value
    console.log("Clicked delete saved recipe", recipe_id)
    const response = fetch(`http://localhost:3000/saved/${recipe_id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(getSavedRecipes())
  }

  return(
    <>
    <button onClick={() => {props.history.push('/index')}}>Back to all recipes</button>
    <h1>Saved Recipes</h1>
    {
      savedRecipes.map(recipe => {
        return(
          <div key={recipe.id}>
            <h1>{recipe.recipe_name}</h1>
            <h2>ID: {recipe.id}</h2>
            {recipe.rating ?
              <span>Rating: {recipe.rating}</span>
              :
              <span>No rating yet!</span>
            }
            <form onSubmit={editRating}>
              <input type='hidden' name='recipe' value={recipe.id} />
              <select name='new_rating'>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
              </select>
              <input type='submit' value='Update rating' />
            </form>
            <br /><br />
            <button onClick={e => deleteSaved(e)} value={recipe.id}>Delete</button>
          </div>
        )
      })
    }
    </>
  )
}
export default SavedRecipes
