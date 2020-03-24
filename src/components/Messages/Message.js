import React from 'react';
import { Comment, Image } from 'semantic-ui-react'

const Message = ({ key, message, user}) => {
    

    const isImage = message => {
        return message.hasOwnProperty('image') && !message.hasOwnProperty('content') 
    }
    const isOwnMessage = (message, user) => {
        return message.user.id === user.uid ? 'message__self' : ''
    }

    return (
   <Comment>
       <Comment.Avatar src={message.user.avatar}/>
       <Comment.Content className={isOwnMessage(message, user)}>
            <Comment.Author as="a">{message.user.name}</Comment.Author>
            <Comment.Metadata>{message.timestamp}</Comment.Metadata>
            
            {isImage(message) ? <Image src={message.image} className="message__image" /> : <Comment.Text>{message.message || message.content}</Comment.Text>}
       </Comment.Content>
   </Comment>
    )
}

export default Message