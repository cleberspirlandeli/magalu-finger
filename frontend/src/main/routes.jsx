import React from 'react';
import {Router, Route, Redirect, hashHistory} from 'react-router';

import Colaborador from './../colaborador/colaborador.jsx';
import Produto from './../produto/produto.jsx';
import Loja from './../loja/loja.jsx';
import Login from './../login/login.jsx';

export default props => (
    <Router history={hashHistory}>
        <Route path='/login' component={Login} />
        <Route path='/colaborador' component={Colaborador} />
        <Route path='/loja' component={Loja} />
        <Route path='/produto' component={Produto} />
        <Redirect from='*' to='/login' />
    </Router>
);