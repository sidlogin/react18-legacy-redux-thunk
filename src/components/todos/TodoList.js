import React from 'react';
import './TodoList.css';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import TodoListItem from '../TodoListItem/TodoListItem';

import { connect } from 'react-redux';
import { removeTodo, markTodoAsCompleted } from '../../redux/action';

const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed } ) => {
    console.log('todos: ', todos)
    return (
        <div className="list-wrapper">
            <NewTodoForm />
            { 
                todos.map((todo, i) => <TodoListItem todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed} 
                    key={i} 
                />) 
            }
        </div>
    );
};

const mapStateToProps = state => ({
    todos: state.todos,
});
const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);