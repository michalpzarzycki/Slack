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
const [numUniqueUsers, setNumUniqueUsers] = useState('')
const [searchTerm, setSearchTerm] = useState('')
const [loading, setLoading] = useState(false)
const [searchResults, setSearchResult] = useState([])

useEffect(() => {
    if(channel && user) {
        addListener(channel.id)
    }
}, [])

useEffect(() => {
    handleSearchMessages()
}, [searchTerm])

const addListener = (channelId) => {
    let loadedMessages = [];
    messageRef.child(channelId).on('child_added', snap => {
        loadedMessages.push(snap.val())
        setMessages([...loadedMessages])
        setMessagesLoading(false)
        countUniqueUsers(loadedMessages)

    })
}

const countUniqueUsers = loadedMessages => {
    const uniqueUsers = loadedMessages.reduce((acc, message) => {
        if(!acc.includes(message.user.name)) {
            acc.push(message.user.name)
        }
        return acc;

    }, [])
      const isPlural = uniqueUsers.length > 1 || uniqueUsers.length ===0
      const numUniqueUsers = `${uniqueUsers.length} user${isPlural ? 's' : ''}`
      setNumUniqueUsers(numUniqueUsers)
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

const displayChannelName = channel => channel ? `#${channel.name}` : '';


const handleSearchChange = event => {
    setSearchTerm(event.target.value)
    setLoading(true)
}

const handleSearchMessages = () => {
    const channelMessages = [...messages];
    const regex = new RegExp(searchTerm, 'gi')
    const searchResults = channelMessages.reduce((acc, message) => {
        if(message.message && message.message.match(regex) || message.user.name.match(regex)) {
            acc.push(message)
        }
        return acc
    }, [])
    setTimeout(()=>{
        setLoading(false)
    }, 1000)
setSearchResult(searchResults)
}
    return(
        <>
        <MessageHeader channelName={displayChannelName(channel)} numUniqueUsers={numUniqueUsers} loading={loading} handleSearchChange={handleSearchChange} />
        <Segment>
            <Comment.Group className="messages">
                {searchTerm ? displayMessages(searchResults) : displayMessages(messages)}
            </Comment.Group>
        </Segment>
        <MessageForm messageRef={messageRef} currentChannel={channel} currentUser={currentUser}/>
        </>
    )
}

export default Messages