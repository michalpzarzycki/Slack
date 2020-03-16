import React from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default function Register() {

    function handleChange() {
    
    }
    return(
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: 450}}>
                <Header as="h2" icon color="orange" textAlign="center">
                    <Icon name="puzzle piece" color="orange"/>
                    Register
                </Header>
                <Form size="large">
                    <Segment stacked>
                        <Form.Input fluid name="username" icon="user" iconPosition="left"
                        placeholder="Username" onChange={handleChange} type="text"
                        />

                        <Form.Input fluid name="email" icon="mail" iconPosition="left"
                        placeholder="Email Adress" onChange={handleChange} type="email"
                        />

                        <Form.Input fluid name="password" icon="lock" iconPosition="left"
                        placeholder="Password" onChange={handleChange} type="password"
                        />

                        <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left"
                        placeholder="Confirm Password" onChange={handleChange} type="password"
                        />
                        <Button color="orange" fluid size="large">SUBMIT</Button>
                    </Segment>

                </Form>
                <Message>Already a user?<Link to="/login">Login</Link></Message>
            </Grid.Column>
        </Grid>
    )
}