import React from 'react'

const Login = ({props, user, setUser, sometoken, setToken}) => {

  const getUser = (username, password) => {
    const response = fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    .then(r => r.json())
    .then(res => {
      let token = res.token
      setToken(token)
      let user_id = parseInt(res.user_id)
      localStorage.token = token
      localStorage.user_id = user_id
      fetch(`http://localhost:3000/users/${res.user_id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token
        }
      })
      .then(r => r.json())
      .then(user => {
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
      })
    })
    if(localStorage.token) {
      props.history.push('/index')
    }
  }

  const newUser = (first_name, last_name, username, password, zipcode) => {
    console.log("inside new user method", first_name, last_name, username, password, zipcode)
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({first_name, last_name, username, password, zipcode})
    })
    .then(r => r.json())
    .then(data => {
      console.log("data", data)
      getUser(username, password)
    })
  }

  const handleLogin = e => {
    e.preventDefault()
    getUser(e.target.username.value, e.target.password.value)
  }

  const handleSignup = e => {
    e.preventDefault()
    console.log("clicked on sign up")
    newUser(e.target.first_name.value, e.target.last_name.value, e.target.username.value, e.target.password.value, e.target.zipcode.value)
  }

  return(
    <div>
      {
        localStorage.user !== "null" ?
        props.history.push('/index')
        :
        <h1>Login, Guest</h1>
      }
      <form onSubmit={handleLogin}>
        <input type='text' name='username' placeholder='Username' />
        <input type='password' name='password' placeholder='Password' />
        <input type='submit' value='Login' />
      </form>

      <h1>Or, sign up!</h1>
      <form onSubmit={handleSignup}>
        <input type='text' name='first_name' placeholder='First Name' />
        <input type='text' name='last_name' placeholder='Last Name' />
        <input type='text' name='zipcode' placeholder='Zipcode' />
        <input type='text' name='username' placeholder='Username' />
        <input type='password' name='password' placeholder='Password' />
        <input type='submit' value='Login' />
      </form>
    </div>
  )
}
export default Login
