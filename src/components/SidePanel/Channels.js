import React, { useState } from 'react'
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react'
import firebase from '../../firebase'


function Channels({ currentUser }) {
const [channels, setChannels] = useState([])
const [modal, setModal] = useState(false)
const [channelInfo, setChannelInfo] = useState({channelName:"", channelDetails:""})
const [channelRef, setChannelRef] = useState(firebase.database().ref('channels'))

const handleChange = event => {
    event.persist()
    setChannelInfo(prev => ({...prev, [event.target.name]: event.target.value}))

    console.log(channelInfo)
}

const addChannel = () => {
    const key = channelRef.push().key
    const { channelName, channelDetails } = channelInfo;
    let newChannel = {
        id: key,
        name: channelName,
        details: channelDetails,
        createdBy: {
            user: currentUser.displayName,
            avatar: currentUser.photoURL,
        }
    }
    channelRef.child(key).update(newChannel).then(()=> {
        setChannelInfo({channelDetails:"", channelName:""})
        closeModal()
        console.log("Channel Added")
    })
}

const handleSubmit = event => {
    if(isFormValid(channelInfo)){
        addChannel()
    }
}

const isFormValid = ({ channelName, channelDetails }) => channelName && channelDetails

const closeModal = () => setModal(false)
const openModal = () => setModal(true)
    return(<>
        <Menu.Menu style={{paddingBottom: "2em"}}>
            <Menu.Item>
                <span>
                    <Icon name="exchange"/> Channels {" "}
                </span>
                ({channels.length}) <Icon name="add" onClick={openModal}/>
            </Menu.Item>
        </Menu.Menu>
        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Add a Channel</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <Input 
                            fluid 
                            label="Name of channel"
                            name="channelName"
                            onChange={handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            fluid 
                            label="About the channel"
                            name="channelDetails"
                            onChange={handleChange}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" inverted onClick={handleSubmit}>
                    <Icon name="checkmark"/>Add
                </Button>
                <Button color="red" inverted onClick={closeModal}>
                    <Icon name="remove"/>Cancel
                </Button>
            </Modal.Actions>
        </Modal>

        </>
    )
}

export default Channels