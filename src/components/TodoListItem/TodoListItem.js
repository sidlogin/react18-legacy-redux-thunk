import React from "react";
import './TodoListItem.css';

const TodoListItem = ({todo, onRemovePressed}) => {
    console.log('Todo: ', todo)
    return (
        <div className="todo-item-container">
            <h3>{todo.text}</h3>
            <div className="buttons-container">
                <button className="completed-button">Mark as Complete</button>
                <button
                    onClick={(e) => onRemovePressed(todo.text) }
                    className="remove-button">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default TodoListItem;