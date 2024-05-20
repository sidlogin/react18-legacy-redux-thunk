import React, { useEffect } from 'react';
import './TodoList.css';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import TodoListItem from '../TodoListItem/TodoListItem';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from '../../redux/thunks';
import { connect } from 'react-redux';

import {
    getTodos,
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos
} from '../../redux/selectors';

const TodoList = ({ onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos, completedTodos, incompleteTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);
    const loadingTodoMessage = <div>Loading todos...</div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            <h3> Incompleted:</h3>
            { 
                incompleteTodos.map((todo, i) => <TodoListItem todo={todo}
                    onRemovePressed={onRemovePressed}
                    onCompletedPressed={onCompletedPressed} 
                    key={i} 
                />) 
            }
            <h3> Completed:</h3>
            { 
                completedTodos.map((todo, i) => <TodoListItem todo={todo}
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
    isLoading: getTodosLoading(state),
    incompleteTodos: getIncompleteTodos(state),
    completedTodos: getCompletedTodos(state),
});
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);