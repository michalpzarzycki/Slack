import React, { useState } from 'react'
import { Grid, Header, Icon, Dropdown, Image } from 'semantic-ui-react'
import firebase from '../../firebase'

function UserPanel(props) {
const [user, setUser] = useState(props.currentUser)


    const dropdownOptions = () => [
        {
            key:"user",
            text:<span>Signed in as <strong>{user.displayName}</strong></span>,
            disabled: true
        },
        {   
            key:"avatar",
            text:<span>Change avatar</span>
        },
        {   
            key:"sign out",
            text:<span onClick={handleSignOut}>Sign Out</span>
        }]

       function handleSignOut() {
           firebase.auth().signOut()
       } 
    return(
        
        <Grid style={{ background:"4c3c4c"}}>
            <Grid.Column>
                <Grid.Row style={{paddnig:"1.2em", margin:0}}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code"/>
                        <Header.Content>CHAT</Header.Content>
                    </Header>
                </Grid.Row>

                <Header style={{ padding: "0.25em"}} as="h4" inverted>
                    <Dropdown trigger={
                    <span>
                        <Image src={user.photoURL} avatar spaced="right"/>
                        {user.displayName}</span>}
                     options={dropdownOptions()}/>
                </Header>
            </Grid.Column>
        </Grid>
    )
}



export default UserPanel