import React, { useState } from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { register } from '../../serviceWorker';
import firebase from '../../firebase';

export default function Login() {
const [ registerData, setRegisterData ] = useState({ email:"", password:""})
const [ errors, setErrors ] = useState([])
const [ loading, setLoading ] = useState(false)
const  { email, password } = registerData;


    function handleChange(event) {
    setRegisterData({...registerData, [event.target.name] : event.target.value})
    }

    function handleSubmit(event) {
        event.preventDefault();
        if(isFormValid(registerData)) {
            setErrors([])
            setLoading(true)
            firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(currentUser => {
                console.log(currentUser)  
                setLoading(false)

            })
            .catch(err => {
                console.error(err);
                setErrors(()=> [err]);
                setLoading(false)
            })
          
        }
      
    }

function isFormValid({ email, password }) {
    return email && password
}

    function handleErrors(errors, inputName) {
        return  errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''}
function displayErrors(errors) {
return errors.map((error, index) => (<p index={index}>Error: {error.message}</p>))
}
    return(
        <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxWidth: 450}}>
                <Header as="h1" icon color="violet" textAlign="center">
                    <Icon name="code branch" color="violet"/>
                    Login
                </Header>
                <Form onSubmit={handleSubmit} size="large">
                    <Segment stacked>

                        <Form.Input fluid 
                        name="email" 
                        icon="mail" 
                        iconPosition="left"
                        placeholder="Email Adress" 
                        onChange={handleChange} 
                        type="email" 
                        value={email}
                        className={handleErrors(errors, "email")}
                        />

                        <Form.Input fluid 
                        name="password" 
                        icon="lock" 
                        iconPosition="left"
                        placeholder="Password" 
                        onChange={handleChange} 
                        type="password" 
                        value={password}
                        className={handleErrors(errors, "password")}
                        />

                        <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">SUBMIT</Button>
                    </Segment>

                </Form>
             {errors.length > 0 && 
                <Message error>
                    {displayErrors(errors)}
                </Message>
                 }
                <Message>Don't have an account?<Link to="/register">Register</Link></Message>
            </Grid.Column>
        </Grid>
    )
}