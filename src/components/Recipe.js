import React from 'react'
import style from '../recipe.module.css'
import RecipeSpec from './RecipeSpec'

const Recipe = ({props, title, calories, image, ingredients, user, setChat, savedRecipes, getSavedRecipes, forums, getForums, setChatId}) => {

  const handleClick = e => {
    console.log("Recipe?", e.target)
  }

  const handleSave = (e) => {
    let recipe_name = e.target.value
    let user_id = parseInt(localStorage.user_id)
    let user = localStorage.user

    fetch("http://localhost:3000/saved", {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        user_id: user_id,
        completed: false,
        rating: null,
        recipe_name: recipe_name
      })
    })
    .then(r => r.json())
    .then(data => {
      getSavedRecipes()
    })
  }

  const handleForm = (e) => {
    console.log("Handle form clicked", title)
    setChat(title)

    fetch('http://localhost:3000/forums')
    .then(r => r.json())
    .then(data => {
      let x = data.filter(f => {
        return f.recipe_name === title
      })
      setChatId(x[0].id)
    })
    props.history.push('/chat')
  }

  const hasSaved = (recipe_title) => {
    let x = savedRecipes.filter(r => {
      return r.recipe_name === recipe_title
    })
    if (x.length === 0) {
      return false
    } else {
      return true
    }
  }

  const hasForum = (recipe_title) => {
    let x = forums.filter(f => {
      return f.recipe_name === recipe_title
    })

    if (x.length > 0) {
      return true
    } else {
      return false
    }
  }

  const newForum = e => {
    console.log("click create new forum")
    let recipe_name = e.target.value

    fetch("http://localhost:3000/forums", {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        recipe_name: recipe_name
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log("data", data)
      getForums()
    })
  }

  return(
    <div className={style.recipe} >
      <h1>{title}</h1>
      {
        hasSaved(title) ?
        <span>Already saved!</span>
        :
        <button value={title} onClick={handleSave}>Save Recipe</button>
      }
      {
        hasForum(title) ?
        <button value={title} onClick={handleForm}>Join Chatroom</button>
        :
        <button value={title} onClick={newForum}>Create one!</button>
      }
      <ol>
        {ingredients.map((ingredient, idx) => (
          <li key={idx}>{ingredient.text}</li>
        ))}
      </ol>
      <p>Calories: {calories}</p>
      <img className={style.image} src={image} alt=''/>
    </div>
  )
}
export default Recipe
