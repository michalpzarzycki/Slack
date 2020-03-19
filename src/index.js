import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import 'semantic-ui-css/semantic.min.css'
import firebase from './firebase'


const Root = (props) => {
    useEffect(()=>{
        console.log("EK")
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                props.history.push('/')
            }
        })
    }, [])

    return(

        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    )
}

const RootWithRouter = withRouter(Root)
ReactDOM.render(<Router><RootWithRouter /></Router>, document.getElementById('root'));


serviceWorker.unregister();
