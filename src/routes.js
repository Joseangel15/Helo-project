import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth_View from './Components/Auth_View/Auth_View';
import Dashboard from './Components/Dashboard/Dashboard';


export default (


    <Switch>
        <Route component={Auth_View} exact path='/' />
        <Route component={Dashboard} path='/dashboard' />
    </Switch>
)
