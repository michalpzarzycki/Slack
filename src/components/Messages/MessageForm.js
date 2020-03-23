import React, { useState } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react'
import firebase from '../../firebase'

function MessageForm({ messageRef, currentChannel, currentUser }) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([])

    const handleChange = event => setMessage(event.target.value)
    const createMessage = () => {
        const messageInfo = {
            timestamp: Date.now(),
            user: {
                id: currentUser.uid,
                name: currentUser.displayName,
                avatar: currentUser.photoURL
            },
            content: message
        }
        return messageInfo
    }
    const sendMessage = () => {
        console.log(message)
        if(message) {
            console.log("HI")
            setIsLoading(true)
            messageRef.child(currentChannel.id).push().set(createMessage()).then(() => {
                setIsLoading(false)
                setMessage("")
                setErrors([])
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
                setErrors(prev => [...prev, err])
            })
        } else {
            setErrors(prev => [...prev, {message: 'Add a message'}])
        }
    }
    return(
        <Segment className="message__form">
            <Input 
                fluid
                name="message"
                onChange={handleChange}
                style={{ marginBottom: "0.7em" }}
                label={<Button icon="add" />}
                labelPosition="left"
                placeholder="Write your message"
                value={message}
                className={errors.some(error => error.message.includes('message')) ? 'error' : ''}
            />
            <Button.Group>
                <Button 
                disabled={isLoading}
                onClick={sendMessage}
                color="orange"
                content="Add reply"
                labelPosition="left"
                icon="edit"
                />
                    <Button 
                color="teal"
                content="Upload media"
                labelPosition="right"
                icon="upload"
                />

            </Button.Group>
        </Segment>
    )
}


export default MessageForm;