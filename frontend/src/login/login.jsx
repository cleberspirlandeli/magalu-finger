import React, { Component } from 'react';
import axios from 'axios';

import PageHeader from './../template/pageHeader.jsx';
import Grid from './../template/grid.jsx';
import LoginValidar from './loginValidar.jsx';


// import LojaSearch from './lojaSearch.jsx';
// import LojaForm from './lojaForm.jsx';
// import LojaList from './lojaList.jsx';

const URL = 'http://localhost:3000/login';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usuario: 'admin',
            senha: '123456'
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
    validarUsuario() {
        // console.log('Usuario..: ', this.state.usuario);
        // console.log('Senha....: ', this.state.senha);

        const Usuario = {
            usuario: this.state.usuario,
            senha: this.state.senha
        }
        axios({
            method: 'OPTIONS',
            url: URL
        }).then(res => {
            axios.post(URL, Usuario)
                .then(res => {
                    console.log(res.data);
                    if (res.data.success == true) {
                        var expires = "";
                        var date = new Date();
                        date.setTime(date.getTime() + (24 * 60 * 60 * 1000));
                        expires = "; expires=" + date.toUTCString();

                        document.cookie = `token=token:${res.data.token}${expires}; path=/`;
                        document.cookie = `session=${res.data.id}${expires}; path=/`;
                        setTimeout(function() { 
                            window.location.href = "http://localhost/#/colaborador";
                        }, 1000);
                    }
                })
                .catch(e => {
                    console.log(e);   
                });
        })
        .catch(e => {
            console.log(e);   
        });
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