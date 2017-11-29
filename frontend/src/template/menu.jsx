import React from 'react';

export default props => (
    <div id="menu" className="navbar navbar-inverse bg-inverse ">

        <div className="container">
            <div className="navbar-header">
                <a href="" className="navbar-brand">
                    <i className="fa fa-calendar-check-o"></i> Magalu Finder
                </a>
            </div>

            <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                    <li><a href="#/colaborador">Colaborador</a></li>
                    <li><a href="#/loja">Loja</a></li>
                    <li><a href="#/produto">Produto</a></li>
                </ul>
            </div>
        </div>
    </div>
);