import React from "react";
import './TodoListItem.css';

const TodoListItem = ({todo, onRemovePressed, onCompletedPressed}) => {
    return (
        <div className="todo-item-container">
            <h5>{todo.text}</h5>
            <div className="buttons-container">
                {
                    todo.isCompleted ? null
                    : <button
                        onClick={(e) => onCompletedPressed(todo) }
                        className="completed-button">
                        Mark as Complete
                    </button>
                }
                <button
                    onClick={(e) => onRemovePressed(todo.id) }
                    className="remove-button">
                    Remove
                </button>
            </div>
        </div>
    );
};

export default TodoListItem;