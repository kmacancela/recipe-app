import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'
import RecipeContainer from './components/RecipeContainer'
import Login from './components/Login'
import SavedRecipes from './components/SavedRecipes'
import Chat from './components/Chat'
import Welcome from './components/Welcome'

const App = () => {

  const APP_ID = process.env.REACT_APP_ID
  const APP_KEY = process.env.REACT_APP_KEY

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')
  const [user, setUser] = useState([])
  const [token, setToken] = useState('')
  const [chat, setChat] = useState('')
  const [chatId, setChatId] = useState(null)
  const [savedRecipes, setSavedRecipes] = useState([])
  const [forums, setForums] = useState([])

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    getRecipes()
  }, [query])

  useEffect(() => {
    getSavedRecipes()
  }, [])

  useEffect(() => {
    getForums()
  }, [])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipes(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }

  const getSavedRecipes = async () => {
    let user_saved = []
    await fetch('http://localhost:3000/saved')
    .then(r => r.json())
    .then(data => {
      user_saved = data.filter(u => {
        return u.user_id === parseInt(localStorage.user_id)
      })
    })
    setSavedRecipes(user_saved)
  }

  const getForums = async () => {
    let active_forums = []
    await fetch('http://localhost:3000/forums')
    .then(r => r.json())
    .then(data => {
      setForums(data)
    })
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path='/index' render={(props) =>
            <RecipeContainer
              props={props}
              search={search}
              updateSearch={updateSearch}
              recipes={recipes}
              getSearch={getSearch}
              user={user}
              setUser={setUser}
              setToken={setToken}
              setChat={setChat}
              savedRecipes={savedRecipes}
              getSavedRecipes={getSavedRecipes}
              forums={forums}
              getForums={getForums}

              setChatId={setChatId}
            />
        } />
        <Route exact path='/login' render={(props) =>
            <Login
              props={props}
              user={user}
              setUser={setUser}
              token={token}
              setToken={setToken}
            />
        } />
        <Route exact path='/saved' render={(props) =>
            <SavedRecipes
              props={props}
              user={user}
              savedRecipes={savedRecipes}
              setSavedRecipes={setSavedRecipes}
              getSavedRecipes={getSavedRecipes}
            />
        } />
        <Route exact path='/chat' render={(props) =>
              <Chat
                props={props}
                chat={chat}
                chatId={chatId}
              />
        } />
        <Route exact path='/' render={(props) =>
              <Welcome
                props={props}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
        } />
      </Switch>
    </div>
  )
}

export default withRouter(App);
