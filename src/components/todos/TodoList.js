import React, { useEffect } from 'react';
import './TodoList.css';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import TodoListItem from '../TodoListItem/TodoListItem';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from '../../redux/thunk';
import { connect } from 'react-redux';

const TodoList = ({ todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    const loadingTodoMessage = <div>Loading todos...</div>;
    const content = (
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
    return isLoading ? loadingTodoMessage : content;
};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    todos: state.todos,
});
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);