import React, {useState, useEffect} from 'react';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../../firebase';
import Message from './Message'

const Messages = ({ currentChannel, currentUser }) => {
const [messageRef, setMessageRef] = useState(firebase.database().ref("messages"))
const [channel, setChannel] = useState(currentChannel)
const [user, serUser] = useState(currentUser)
const [messages, setMessages] = useState([])
const [messagesLoading, setMessagesLoading] = useState(false)

useEffect(() => {
    if(channel && user) {
        addListener(channel.id)
    }
}, [])

const addListener = (channelId) => {
    let loadedMessages = [];
    messageRef.child(channelId).on('child_added', snap => {
        loadedMessages.push(snap.val())
        setMessages([...loadedMessages])
        setMessagesLoading(false)
    })
}

const displayMessages = (messages) => (
   messages.length > 0 && messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={user}
      />
  ))
  
)
    return(
        <>
        <MessageHeader />
        <Segment>
            <Comment.Group className="messages">
                {displayMessages(messages)}
            </Comment.Group>
        </Segment>
        <MessageForm messageRef={messageRef} currentChannel={channel} currentUser={currentUser}/>
        </>
    )
}

export default Messages