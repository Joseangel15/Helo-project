import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth_View from './Components/Auth_View/Auth_View';
import Dashboard from './Components/Dashboard/Dashboard';
import Profile_View from './Components/Profile_View/Profile_View';
import Search_View from './Components/Search_View/Search_View';


export default (


    <Switch>
        <Route component={Auth_View} exact path='/' />
        <Route component={Dashboard} path='/dashboard/' />
        <Route component={Profile_View} path='/profile_view' />
        <Route component={Search_View} path='/search_view' />
    </Switch>
)
