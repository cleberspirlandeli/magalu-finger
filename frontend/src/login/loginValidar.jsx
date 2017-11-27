import React from 'react';
import Grid from './../template/grid.jsx';
import IconButton from './../template/iconButton.jsx';


export default props => {

    return (
        <nav className="navbar navbar-inverse bg-inverse">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        <form className="navbar-form navbar-left" role="search">
                            <div className="form-group margin-right">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="usuario"
                                    placeholder="Usuário"
                                    value={props.usuario}
                                    onChange={props.digitarUsuario} />
                            </div>
                            <div className="form-group margin-right">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="senha"
                                    placeholder="Senha"
                                    value={props.senha}
                                    onChange={props.digitarSenha} />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={props.validarUsuario}>Entrar</button>
                        </form>
                    </ul>
                </div>
            </div>
        </nav>
    )
}