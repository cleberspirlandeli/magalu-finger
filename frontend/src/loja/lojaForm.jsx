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

    const alertsMessages = (props) => {
        if (props.alertError) {
            return <div
                className="alert alert-danger col-sm-10 col-md-12"
                role="alert"
                hide={props.editar}
            >{props.messageError}</div>
        } else if (props.alertSuccess) {
            return <div
                className="alert alert-success col-sm-10 col-md-12"
                role="alert"
                hide={props.alertSuccess}
            >{props.messageSuccess}</div>
        }
    }

    return (
        <div role="form" className="margin-bottom">
            <hr />
            <p className="cadastrar-cliente">Cadastrar Loja</p>

            <div>
                {alertsMessages(props)}
            </div>


            <Grid cols="12 9 10">
                <fieldset disabled>
                    <input
                        type="hidden"
                        id="idLoja"
                        className="form-control"
                        placeholder=""
                        value={props.idLoja}
                    />
                </fieldset>
            </Grid>
            <div className="padding-top padding-bottom">
                <Grid cols="12 4 4">
                    <input
                        type="text"
                        id="descricaoLoja"
                        className="form-control"
                        placeholder="Descrição da loja"
                        value={props.descricaoLoja}
                        onChange={props.digitarDescricao}
                    />
                </Grid>
                <Grid cols="12 4 3">
                    <input
                        type="number"
                        id="codigoLoja"
                        className="form-control"
                        placeholder="Código Loja"
                        value={props.codigoLoja}
                        onChange={props.digitarCodigo}
                    />
                </Grid>
                <Grid cols="12 4 3">
                    <input
                        type="number"
                        id="cepLoja"
                        className="form-control"
                        placeholder="CEP"
                        value={props.cepLoja}
                        onChange={props.digitarCep}
                    />
                </Grid>
                <Grid cols="12 4 2">
                    <IconButton
                        style="info"
                        icon="search"
                        onClick={props.pesquisarCep}
                    />
                </Grid>

            </div>
            <div className="padding-top padding-bottom">
                <Grid cols="12 4 4">
                    <input
                        type="text"
                        id="cidadeLoja"
                        className="form-control"
                        placeholder="Cidade"
                        value={props.cidadeLoja}
                    />
                </Grid>
                <Grid cols="12 4 3">
                    <input
                        type="text"
                        id="estadoLoja"
                        className="form-control"
                        placeholder="Estado"
                        value={props.estadoLoja}
                    />
                </Grid>
                <Grid cols="12 4 2">
                    <IconButton
                        style="primary"
                        icon="plus"
                        onClick={props.adicionarLoja}
                        hide={props.editar}
                    />
                    <IconButton
                        style="primary"
                        icon="check"
                        onClick={() => props.editarLoja()}
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