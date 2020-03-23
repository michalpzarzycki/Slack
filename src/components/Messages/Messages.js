import React from 'react';
import MessageHeader from './MessageHeader'
import MessageForm from './MessageForm'
import { Segment, Comment, Message } from 'semantic-ui-react'

const Messages = () => {
    return(
        <>
        <MessageHeader />
        <Segment>
            <Comment.Group className="messages">
                {/* MESSAGES */}
            </Comment.Group>
        </Segment>
        <MessageForm />
        </>
    )
}

export default Messages