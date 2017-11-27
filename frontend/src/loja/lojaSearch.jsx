import React from 'react';
import Grid from './../template/grid.jsx';
import IconButton from './../template/iconButton.jsx';


export default props => {

    const keyHandler = (e) =>{
        if (e.key === 'Enter') {
            props.pesquisarColaborador();
        }else if (e.key === 'Escape') {
            props.limparCampoPesquisa();
        }
    }

    return (
        <div role="form" className="padding-bottom">

            <Grid cols="12 9 10">
                <input
                    type="text"
                    id="pesquisar"
                    className="form-control"
                    placeholder="Pesquisar loja"
                    value={props.pesquisar}
                    onChange={props.digitarPesquisa}
                    onKeyUp={keyHandler}
                />
            </Grid>

            <Grid cols="12 3 2">

                <IconButton
                    style="info"
                    icon="search"
                    onClick={props.pesquisarColaborador}
                />
                <IconButton
                    style="default"
                    icon="close"
                    onClick={props.limparCampoPesquisa}
                />
            </Grid>

        </div>
    )

}