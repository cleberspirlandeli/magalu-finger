import React from 'react';
import IconButton from './../template/iconButton.jsx';

export default props => {

    const renderRows = () => {
        const list = props.list || [];
        return (
            list.map(todo =>(
                <tr key={todo._id}>
                    <td className={todo.done?'markedAsDone':''}>{todo.description}</td>
                    <td>
                        <IconButton 
                            style="success" 
                            icon="check"
                            onClick={()=> props.handleMarckAsDone(todo)} 
                            hide={todo.done}
                        />
                        <IconButton 
                            style="warning" 
                            icon="undo"
                            onClick={()=> props.handleMarkAsPending(todo)} 
                            hide={!todo.done}
                        />
                        <IconButton 
                            style="danger" 
                            icon="trash-o"
                            hide={!todo.done}
                            onClick={()=> props.handleRemove(todo)} 
                        />
                    </td>
                </tr>
            ))
        );
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <td>Descrição</td>
                    <td className="tableActions">Ações</td>
                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    );
}