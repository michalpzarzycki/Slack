import React from 'react'
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react'

function UserPanel() {

    const dropdownOptions = () => [
        {
            key:"user",
            text:<span>Signed in as <strong>User</strong></span>,
            disabled: true
        },
        {   
            key:"avatar",
            text:<span>Change avatar</span>
        },
        {   
            key:"sign out",
            text:<span>Sign Out</span>
        }]
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
                    <Dropdown trigger={<span>User</span>} options={dropdownOptions()}/>
                </Header>
            </Grid.Column>
        </Grid>
    )
}


export default UserPanel