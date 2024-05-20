import {
    createTodo, 
    removeTodo,
    loadTodoSuccess,
    loadTodoFailure,
    loadTodoInProgress,
    markTodoAsCompleted
} from "./action";

const API_URL = 'http://localhost:3100/todos';
export const loadTodos = () => async(dispatch, getState) => {
    try {
        dispatch(loadTodoInProgress());
        const response = await fetch(API_URL);
        const todos = await response.json();
        dispatch(loadTodoSuccess(todos));
    } catch(e) {
        dispatch(loadTodoFailure());
        dispatch(displayAlert(e));
    }
}

export const addTodoRequest = text => async dispatch => {
    try {
        const response = await fetch(API_URL, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body: JSON.stringify({ id: new Date().getUTCMilliseconds().toString(), text, isCompleted: false }),
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'delete'
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const markTodoAsCompletedRequest = todo => async dispatch => {
    console.log('markTodoAsCompletedRequest: ', todo);
    try {
        const { id, text, isCompleted } = todo;
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'put',
            body: JSON.stringify({ id, text, isCompleted: true }),

        });
        const updatedTodo = await response.json();
        dispatch(markTodoAsCompleted(updatedTodo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
}