import React from 'react';
import IconButton from './../template/iconButton.jsx';

export default props => {

    const renderRows = () => {
        const listaColaboradores = props.listaColaboradores || [];
        return (
            listaColaboradores.map(colaborador => (
                <tr key={colaborador.id}>
                    <td>{colaborador.nome}</td>
                    <td>{colaborador.tipo}</td>
                    <td>{(colaborador.ativo === 'S' ? 'Ativo' : 'Desativado')}</td>
                    <td>
                        <IconButton
                            style="warning"
                            icon="pencil"
                            onClick={() => props.selecionarColaboradorId(colaborador)}
                        />
                        <IconButton
                            style="danger"
                            icon="trash-o"
                            onClick={() => props.removerColaborador(colaborador.id)}
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
                        <td>Nome</td>
                        <td>Tipo</td>
                        <td>Ativo</td>
                        <td className="tableActions">Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {renderRows()}
                </tbody>
            </table>
        </div>

    );
}