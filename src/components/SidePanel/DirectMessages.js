import React, { useState, useEffect } from 'react'
import { Menu, Icon, CommentContent } from 'semantic-ui-react'
import firebase from '../../firebase'
function DirectMessages({ currentUser }) {

const [users, setUsers] = useState([])
const [user, setUser] = useState(currentUser)
const [usersRef, setUsersRef] = useState(firebase.database().ref('users'))
const [connectedRef, setConnectedRef] = useState(firebase.database().ref('.info/connected'))
const [presenceRef, setPresenceRef] = useState(firebase.database().ref('presence'))

useEffect(() => {
    if(user) {
        addListeners(user.uid)

    }
}, [])

const addListeners = currentUserUid => {
    let loadedUsers = [];
    usersRef.on('child_added', snap => {

        if(currentUserUid !== snap.key) {

            let user = snap.val()
            user['id'] = snap.key;
            user["status"] = 'offline'
            loadedUsers.push(user);
            setUsers([...loadedUsers])
        }
    })
    connectedRef.on('value', snap => {

        if(snap.val() === true) {

            let ref  = presenceRef.child(currentUserUid);
            ref.set(true)
            ref.onDisconnect(err => {
                if(err !== null) {
                    console.error(err)
                }
            })
        }
    })

    presenceRef.on('child_added', snap => {
        


        if(currentUserUid !== snap.key) {

            addStatusToUser(snap.key)

        }
    })
    presenceRef.on('child_removed', snap => {

        if(currentUserUid !== snap.key) {
            addStatusToUser(snap.key, false)
        }
    })
}

const addStatusToUser = (userId, connected=true) => {
        const updatedUsers = users.reduce((acc, user) => {
            if(user.uid === userId) {
                user['status'] = `${ connected ? 'online' : 'offline'}`
            }
            return acc.concat(user)
        }, [])
        setUsers([...updatedUsers])
}

const isUserOnline = user => user.status === 'online'
     return(
        <Menu.Menu className="menu">
            <Menu.Item>
                <span>
                    <Icon name="mail"/> DIRECT MESSAGES
                </span> {" "}
                {users.length}
            </Menu.Item>
            { users.map( user => {
                return(
                <Menu.Item
                key={user.uid}
                onClick={() => console.log(user)}

                >
                    <Icon 
                    name="circle"
                    color={isUserOnline(user) ? 'green' : 'red'}
                    />@ {user.name} 
                </Menu.Item>)
})}
        </Menu.Menu>
    )
}

export default DirectMessages;