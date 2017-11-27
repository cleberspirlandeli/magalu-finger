import React from 'react';
import Grid from './../template/grid.jsx';
import IconButton from './../template/iconButton.jsx';


export default props => {

    const keyHandler = (e) => {
        if (e.key === 'Enter') {
            e.shiftKey ? props.handleSearch() : props.handleAdd();
        } else if (e.key === 'Escape') {
            props.handleClear();
        }
    }

    return (
        <div role="form" className="margin-bottom">
            <hr />
            <p className="cadastrar-cliente">Cadastrar Colaborador</p>
            <Grid cols="12 9 10">
                <fieldset disabled>
                    <input
                        type="hidden"
                        id="idColaborador"
                        className="form-control"
                        placeholder=""
                        value={props.idColaborador}
                    />
                </fieldset>
            </Grid>
            <div className="padding-top padding-bottom">
                <Grid cols="12 4 4">
                    <input
                        type="text"
                        id="nomeColaborador"
                        className="form-control"
                        placeholder="Nome"
                        value={props.nomeColaborador}
                        onChange={props.digitarNome}
                    />
                </Grid>
                <Grid cols="12 4 4">
                    <input
                        type="password"
                        id="senhaColaborador"
                        className="form-control"
                        placeholder="Senha"
                        value={props.senhaColaborador}
                        onChange={props.digitarSenha}
                    />
                </Grid>
                <Grid cols="12 4 2">
                    <div className="input-group">
                        <input 
                            type="text" 
                            id="tipoColabarador" 
                            className="form-control cursor-pointer" 
                            disabled 
                            value={props.tipoColaborador}
                            onChange={props.digitarTipo}
                        />

                        <div className="input-group-btn">
                            <button type="button" 
                                    className="btn dropdown-toggle" 
                                    data-toggle="dropdown">
                                <span className="caret"></span>
                            </button>
                            <ul id="listaTipoColaborador" 
                                className="dropdown-menu">
                                <li><a>Vendedor</a></li>
                                <li><a>Gestor</a></li>
                            </ul>
                        </div>
                    </div>
                </Grid>
                <Grid cols="12 4 2">
                    <IconButton
                        style="primary"
                        icon="plus"
                        onClick={props.adicionarColaborador}
                        hide={props.editar}
                    />
                    <IconButton
                        style="primary"
                        icon="check"
                        onClick={() => props.editarColaborador()}
                        hide={!props.editar}
                    />
                    <IconButton
                        style="default"
                        icon="close"
                        onClick={props.limparFormulario}
                        hide={!props.editar}
                    />
                </Grid>
            </div>
        </div> // Fim div Total
    )
}