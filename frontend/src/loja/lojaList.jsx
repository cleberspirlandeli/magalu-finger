import React from 'react';
import IconButton from './../template/iconButton.jsx';

export default props => {

    const renderRows = () => {
        const listaLojas = props.listaLojas || [];
        return (
            listaLojas.map(loja => (
                <tr key={loja.id}>
                    <td>{loja.descricao}</td>
                    <td>{loja.codigofilial}</td>
                    <td>{loja.cep}</td>
                    <td>{loja.cidade}</td>
                    <td>{loja.estado}</td>
                    <td>
                        <IconButton
                            style="warning"
                            icon="pencil"
                            onClick={() => props.selecionarLojaId(loja)}
                        />
                        <IconButton
                            style="danger"
                            icon="trash-o"
                            onClick={() => props.removerLoja(loja.id)}
                        />
                    </td>
                </tr>
            ))
        );
    }

    return (
        <div className="padding-top">
            <hr />
            <table className="table padding-top">
                <thead>
                    <tr>
                        <td><b>Descrição</b></td>
                        <td><b>Código</b></td>
                        <td><b>CEP</b></td>
                        <td><b>Cidade</b></td>
                        <td><b>Estado</b></td>
                        <td className="tableActions"><b>Ações</b></td>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>

    );
}