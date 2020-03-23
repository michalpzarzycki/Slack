import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react'

function MessageForm() {
    return(
        <Segment className="message__form">
            <Input 
                fluid
                name="message"
                style={{ marginBottom: "0.7em" }}
                label={<Button icon="add" />}
                labelPosition="left"
                placeholder="Write your message"
            />
            <Button.Group>
                <Button 
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