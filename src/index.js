import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Spinner from './components/Spinner'
import 'semantic-ui-css/semantic.min.css'
import firebase from './firebase'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './components/reducers';
import { setUser, clearUser } from './components/actions'


const store =createStore(rootReducer, composeWithDevTools())

const Root = (props) => {
    useEffect(()=>{
        console.log("EK")
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                props.setUser(user)
                props.history.push('/')
            } else {
                props.history.push('/login')
                props.clearUser()

            }
        })
    }, [])

    return props.isLoading ? <Spinner /> : (

        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    )
}
const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
})
const RootWithRouter = withRouter(connect(mapStateFromProps, { setUser, clearUser })(Root))
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithRouter />
        </Router>
    </Provider>
, document.getElementById('root'));


serviceWorker.unregister();
