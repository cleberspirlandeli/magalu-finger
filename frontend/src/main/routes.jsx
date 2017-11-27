import React from 'react';
import {Router, Route, Redirect, hashHistory} from 'react-router';

import Todo from './../todo/todo.jsx';
import Colaborador from './../colaborador/colaborador.jsx';
import Produto from './../produto/produto.jsx';
import Loja from './../loja/loja.jsx';
import Login from './../login/login.jsx';

export default props => (
    <Router history={hashHistory}>
        <Route path='/colaborador' component={Colaborador} />
        <Route path='/loja' component={Loja} />
        <Route path='/produto' component={Produto} />
        <Route path='/login' component={Login} />
        <Redirect from='*' to='/login' />
    </Router>
);
// <Route path='/todos' component={Todo} />