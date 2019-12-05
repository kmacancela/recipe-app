import React, {useEffect, useState} from 'react'
import style from '../recipe.module.css'

const Welcome = ({props, loggedIn, setLoggedIn}) => {

  const handleLogin = () => {
    if(localStorage.user) {
      props.history.push('/search')
    } else {
      props.history.push('/login')
    }
  }

  return (
    <>
    <h1>Welcome to Some Recipe App!</h1>
    <button onClick={handleLogin}>Log in</button>
    <button>Sign up</button>
    </>
  )
}
export default Welcome
