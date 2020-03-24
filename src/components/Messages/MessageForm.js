import React, { useState, useEffect } from 'react';
import { Segment, Button, Input } from 'semantic-ui-react'
import FileModal from './FileModal'
import uuidv4 from 'uuid/v4'
import firebase from '../../firebase'

function MessageForm({ messageRef, currentChannel, currentUser }) {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([])
    const [modal, setModal] = useState(false)
    const [channel, setChannel] = useState(currentChannel)
    const [uploadState, setUploadState] = useState('')
    const [uploadTask, setUploadTask] = useState(null)
    const [storageRef, setStorageRef] = useState(firebase.storage().ref())
    const [percentUploaded, setPercentUploaded] = useState(0)


useEffect(()=>{
 
   uploadTask && uploadTask.on('state_changed', snap => {
            const percentUpload = Math.round((snap.bytesTransferred/snap.totalBytes)*100)
            setPercentUploaded(percentUpload)
    }, 
    err => {
            setErrors(prev => [...prev, err])
            setUploadState('error')
            setUploadTask(null)
    }, 
    () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            sendFileMessage(downloadURL, messageRef, channel.id)
        }).catch(err => {
            console.log(err)
            setErrors(prev => [...prev, err])
            setUploadState('error')
            setUploadTask(null)
        })
    }
    )

}, [uploadState, uploadTask])


const sendFileMessage = (fileURL, ref, pathToURL) => {
    ref.child(pathToURL).push().set(createMessage(fileURL)).then(()=>{
        setUploadState('done')
    }).catch(err => {
        setErrors(prev => [...prev, err])
        setUploadState('error')
    })
}

    const handleChange = event => setMessage(event.target.value)
    const createMessage = (fileURL=null) => {
        const messageInfo = {
            timestamp: Date.now(),
            user: {
                id: currentUser.uid,
                name: currentUser.displayName,
                avatar: currentUser.photoURL
            }
        }
            if(fileURL !== null) {
                messageInfo['image'] = fileURL
            } else {
                messageInfo['message'] = message;
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


    const uploadFile = (file, metadata) => {
            console.log("iploading")
        const pathToUpload = channel.id;
        const ref = messageRef;
        const filePath = `/chat/public/${uuidv4()}.jpg`
        setUploadState('uploading')
        setUploadTask(storageRef.child(filePath).put(file, metadata))
        console.log("uploaded")
    }

    const openModal = () => setModal(true)
    const closeModal = () => setModal(false)
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
                onClick={openModal}
                />
                <FileModal modal={modal} closeModal={closeModal} uploadFile={uploadFile}/>
            </Button.Group>
        </Segment>
    )
}


export default MessageForm;