import React, { useState, useDebugValue, useEffect } from 'react'
import { Menu, Icon, Modal, Form, Input, Button, MenuItem } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setCurrentChannel } from '../actions'
import firebase from '../../firebase'


function Channels({ currentUser, setCurrentChannel }) {
const [channels, setChannels] = useState("")
const [modal, setModal] = useState(false)
const [channelInfo, setChannelInfo] = useState({channelName:"", channelDetails:""})
const [channelRef, setChannelRef] = useState(firebase.database().ref('channels'))
const [firstLoad, setFirstLoad] = useState(true)
const [activeChannel, setActiveChannel] = useState("")

useEffect(() => {
    addListeners()
    return () => {
        channelRef.off()
    }
},[])
useEffect(() => {
    setFirstChannel()

}, [channels])

const setFirstChannel = () => {
    let firstChannel = channels[0];
    if(firstLoad===true && channels.length > 0) {
        setCurrentChannel(firstChannel)
        console.log("HIIII")
        setFirstLoad(false) 
        setActiveChannels(firstChannel)

    }
}

const setActiveChannels = (channel) => {
    setActiveChannel(channel.id)
}
const addListeners =  () => {
    let loadedChannels = [];
    channelRef.on("child_added", snap => {
        console.log("SNAPVAL", snap.val())
        loadedChannels.push(snap.val())
        setChannels([...loadedChannels])
    
    })
}
const handleChange = event => {
    event.persist()
    setChannelInfo(prev => ({...prev, [event.target.name]: event.target.value}))

}

const changeChannel = (channel) => {
 setCurrentChannel(channel)
 setActiveChannels(channel)
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
    })
}

const handleSubmit = event => {
    if(isFormValid(channelInfo)){
        addChannel()
    }
}

const displayChannels = channels => {
    console.log("CHANS", channels)
    return channels.length > 0 && channels.map((channel) => (
        <Menu.Item
            key={channel.id}
            onClick={() => changeChannel(channel)}
            name={channel.name}
            style={{ opacity: 0.7 }}
            active={channel.id == activeChannel}
        >
            #{channel.name}
        </Menu.Item>
    ))
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
            {displayChannels(channels)}
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

export default connect(null, { setCurrentChannel })(Channels)