import React, { useReducer, useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'
function DirectMessages() {

const [users, setUsers] = useState("")

    return(
        <Menu.Menu className="menu">
            <Menu.Item>
                <span>
                    <Icon name="mail"/> DIRECT MESSAGES
                </span> {" "}
                {users.length}
            </Menu.Item>
            {/* USERS TO SEND DMs*/}
        </Menu.Menu>
    )
}

export default DirectMessages;