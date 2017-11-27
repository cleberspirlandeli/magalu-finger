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
            <p className="cadastrar-cliente">Cadastrar Loja</p>
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
                <Grid cols="12 5 5">
                    <input
                        type="text"
                        id="descricaoProduto"
                        className="form-control"
                        placeholder="Descrição do produto"
                        value={props.descricaoProduto}
                        onChange={props.digitarDescricao}
                    />
                </Grid>
                <Grid cols="12 5 5">
                    <input
                        type="number"
                        id="codigoProduto"
                        className="form-control"
                        placeholder="Código Produto"
                        value={props.codigoProduto}
                        onChange={props.digitarCodigo}
                    />
                </Grid>


            </div>
            <div className="padding-top padding-bottom">
                <Grid cols="12 5 5">
                    <div className="input-group">
                        <div className="input-group-addon">R$</div>
                        <input
                            type="number"
                            id="valorVendaProduto"
                            className="form-control"
                            placeholder="00,00"
                            pattern="[0-9]+([\,.][0-9]+)?" 
                            step="0.01"
                            value={props.valorVendaProduto}
                            onChange={props.digitarValor}
                        />
                    </div>
                </Grid>

                <Grid cols="12 5 5">
                    <input
                        type="number"
                        id="quantidadeProduto"
                        className="form-control"
                        placeholder="Quantidade Produto"
                        value={props.quantidadeProduto}
                        onChange={props.digitarQuantidade}
                    />
                </Grid>

                <Grid cols="12 4 2">
                    <IconButton
                        style="primary"
                        icon="plus"
                        onClick={props.adicionarProduto}
                        hide={props.editar}
                    />
                    <IconButton
                        style="primary"
                        icon="check"
                        onClick={() => props.editarProduto()}
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