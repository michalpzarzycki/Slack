import React, {useState} from 'react';
import MessageHeader from './MessageHeader';
import MessageForm from './MessageForm';
import { Segment, Comment, Message } from 'semantic-ui-react';
import firebase from '../../firebase';

const Messages = ({ currentChannel, currentUser }) => {
const [messageRef, setMessageRef] = useState(firebase.database().ref("messages"))
const [channel, setChannel] = useState(currentChannel)
    return(
        <>
        <MessageHeader />
        <Segment>
            <Comment.Group className="messages">
                {/* MESSAGES */}
            </Comment.Group>
        </Segment>
        <MessageForm messageRef={messageRef} currentChannel={channel} currentUser={currentUser}/>
        </>
    )
}

export default Messages