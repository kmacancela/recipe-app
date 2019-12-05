import React, {useEffect, useState} from 'react'
import style from '../recipe.module.css'

const Chat = ({props, chat, chatId}) => {

  const [messages, setMessages] = useState([])

  const getChatForm = async () => {
    await fetch('http://localhost:3000/forums')
    .then(r => r.json())
    .then(data => {
      let this_forum = data.filter(forum => {
        return forum.recipe_name === chat
      })
      fetch('http://localhost:3000/messages')
      .then(r => r.json())
      .then(data => {
        let this_messages = data.filter(message => {
          return message.recipe_form_id === this_forum[0].id
        })
        setMessages(this_messages)
      })
    })
  }

  const handleDelete = e => {
    console.log("Delete message clicked", e.target.value)
    let message_id = e.target.value
    fetch(`http://localhost:3000/messages/${message_id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
    .then(getChatForm())
  }

  const newMessage = (e) => {
    e.preventDefault()
    fetch("http://localhost:3000/messages", {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: JSON.stringify({
        user_id: parseInt(localStorage.user_id),
        recipe_form_id: chatId,
        comment: e.target.comment.value
      })
    })
    .then(r => r.json())
    .then(getChatForm())
  }

  useEffect(() => {
    getChatForm()
  }, [newMessage])

  // const getMessageAuthor = (messageUserId) => {
  //   console.log(messageUserId)
    // fetch('http://localhost:3000/users')
    // .then(r => r.json())
    // .then(data => {
    //   let x = data.filter(d => {
    //     return d.id === messageUserId
    //   })
    //   console.log(x, "yes?")
    //   // return x.first_name
    // })
  // }

  return (
    <>
    <button onClick={() => props.history.push('/index')}>Back to All Recipes</button>
    <h1>Chat for {chat}</h1>
    <form id={chat} onSubmit={newMessage}>
      <input type='textarea' name='comment' placeholder='Write your message here...' />
      <input type='submit' value='Submit comment' />
    </form>
    {messages.map((message, idx) => {
      return (
        <div key={message.id}>
          <span>{message.comment}</span>
          {
            parseInt(localStorage.user_id) === message.user_id
            ?
            <button value={message.id} onClick={handleDelete}>Delete</button>
            :
            null
          }
        </div>
      )
    })}
    </>
  )
}
export default Chat
