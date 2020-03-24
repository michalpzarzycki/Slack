import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

function MessageHeader({ channelName }) {

    return(
        <Segment clearing>
            <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
                <span>
                    {channelName}
                    <Icon name="star outline" color="black"/>
                </span>
                <Header.Subheader>2 users</Header.Subheader>
            </Header>
            <Header floated="right">
                <Input 
                 size="mini"
                 icon="search"
                 name="searchTerm"
                 placeholder="Search Messages"
                />
            </Header>
        </Segment>
    )
}


export default MessageHeader


