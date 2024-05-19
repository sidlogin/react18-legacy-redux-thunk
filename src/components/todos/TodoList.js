import React from 'react';
import './TodoList.css';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import TodoListItem from '../TodoListItem/TodoListItem';

import { connect } from 'react-redux';
import { removeTodo } from '../../redux/action';

const TodoList = ({ todos = [], onRemovePressed} ) => {
    console.log('todos: ', todos)
    return (
        <div className="list-wrapper">
            <NewTodoForm />
            { todos.map((todo, i) => <TodoListItem todo={todo} onRemovePressed={onRemovePressed} key={i} /> ) }
        </div>
    );
};

const mapStateToProps = state => ({
    todos: state.todos,
});
const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);