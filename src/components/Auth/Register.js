import React, { useState } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { register } from '../../serviceWorker';
import firebase from '../../firebase'

export default function Register() {
const [ registerData, setRegisterData ] = useState({username:"", email:"", password:"", passwordConfirmation:""})
const  { username, email, password, passwordConfirmation } = registerData;

    function handleChange(event) {
    setRegisterData({...registerData, [event.target.name] : event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: 450}}>
                <Header as="h2" icon color="orange" textAlign="center">
                    <Icon name="puzzle piece" color="orange"/>
                    Register
                </Header>
                <Form onSubmit={handleSubmit} size="large">
                    <Segment stacked>
                        <Form.Input fluid name="username" icon="user" iconPosition="left"
                        placeholder="Username" onChange={handleChange} type="text" value={username}
                        />

                        <Form.Input fluid name="email" icon="mail" iconPosition="left"
                        placeholder="Email Adress" onChange={handleChange} type="email" value={email}
                        />

                        <Form.Input fluid name="password" icon="lock" iconPosition="left"
                        placeholder="Password" onChange={handleChange} type="password" value={password}
                        />

                        <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left"
                        placeholder="Confirm Password" onChange={handleChange} type="password" value={passwordConfirmation}
                        />
                        <Button color="orange" fluid size="large">SUBMIT</Button>
                    </Segment>

                </Form>
                <Message>Already a user?<Link to="/login">Login</Link></Message>
            </Grid.Column>
        </Grid>
    )
}