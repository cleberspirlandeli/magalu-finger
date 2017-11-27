import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from './../template/pageHeader.jsx';
import Grid from './../template/grid.jsx';
import LoginValidar from './loginValidar.jsx';


// import LojaSearch from './lojaSearch.jsx';
// import LojaForm from './lojaForm.jsx';
// import LojaList from './lojaList.jsx';

const URL = 'http://localhost:3000/api/login';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: '',
            senha: ''
        }

        // CAMPOS INPUT
        this.digitarUsuario = this.digitarUsuario.bind(this);
        this.digitarSenha = this.digitarSenha.bind(this);

        // Métodos - Função
        this.validarUsuario = this.validarUsuario.bind(this);
    }

    digitarUsuario(e) {
        this.setState({ ...this.state, usuario: e.target.value });
    }
    digitarSenha(e) {
        this.setState({ ...this.state, senha: e.target.value });
    }
    validarUsuario(){
        // console.log('Usuario..: ', this.state.usuario);
        // console.log('Senha....: ', this.state.senha);

        const Usuario ={
            usuario: this.state.usuario,
            senha: this.state.senha
        }

        axios.post(URL, Usuario)
        .then(res => {
            if (res.data.httpCode === 201) {
                console.log('Receber Cookie e pegar id: ' + res);
            }
        }
        ).catch(e => console.log('Login erro ' , e));
    }

    render() {
        return (
            <div>
                <LoginValidar
                    usuario={this.state.usuario}
                    senha={this.state.senha}

                    digitarUsuario={this.digitarUsuario}
                    digitarSenha={this.digitarSenha}

                    validarUsuario={this.validarUsuario}
                />
            </div>
        );
    }
}

/* 

<div className="navbar navbar-inverse bg-inverse ">
                    <div className="container">
                        <div className="navbar-header">
                            <a href="" className="navbar-brand">
                                <i className="fa fa-calendar-check-o"></i> Magalu Finder
                            </a>
                        </div>

                        <Grid cols="12 4 4">
                            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </div>
                        </Grid>

                    </div>
                </div>

*/