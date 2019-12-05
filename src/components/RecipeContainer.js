import React from 'react';
import Recipe from './Recipe'
import '../App.css';

const RecipeContainer = ({props, search, updateSearch, recipes, getSearch, user, setUser, setToken, setChat, savedRecipes, getSavedRecipes, forums, getForums, setChatId}) => {

  const handleClick = () => {
    props.history.push('/saved')
  }

  const handleLogout = () => {
    console.log("Clicked log out")
    setUser([])
    setToken('')
    localStorage.token = null
    localStorage.user_id = null
    localStorage.user = null
    props.history.push('/login')
  }

  return(
    <>
      
      <button onClick={handleClick}>Saved Recipes</button>
      <button onClick={handleLogout}>Log out</button>
      <form onSubmit ={getSearch} className='search-form'>
        <input className='search-bar' type='text'value={search} onChange={updateSearch}/>
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            props={props}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            user={user}
            setChat={setChat}
            savedRecipes={savedRecipes}
            getSavedRecipes={getSavedRecipes}
            forums={forums}
            getForums={getForums}
            setChatId={setChatId}
          />
        ))}
      </div>
    </>
  )
}
export default RecipeContainer
