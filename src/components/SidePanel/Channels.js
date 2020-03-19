import React, { useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

function Channels() {
const [channels, setChannels] = useState([])
    return(
        <Menu.Menu style={{paddingBottom: "2em"}}>
            <Menu.Item>
                <span>
                    <Icon name="exchange"/> Channels {" "}
                </span>
                ({channels.length}) <Icon name="add"/>
            </Menu.Item>
        </Menu.Menu>
    )
}

export default Channels