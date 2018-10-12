import React from 'react'
import Header from '../Header/Header'
import Game from '../Game/Game'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Product from '../Product/Product'
import {Route, Switch} from 'react-router-dom'

const App = () => (
    <div>
      <Header/>
      <Switch>
        <Route path='/game' component={Game}/>
        <Route path='/products' component={Product}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
      </Switch>
    </div>
);

export default App
