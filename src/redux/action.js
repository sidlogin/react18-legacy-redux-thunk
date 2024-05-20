export const CREATE_TODO = "CREATE_TODO";
export const REMOVE_TODO = "REMOVE_TODO";
export const MARK_TODO_AS_COMPLETED = "MARK_TODO_AS_COMPLETED";
export const LOAD_TODO_IN_PROGRESS = "LOAD_TODO_IN_PROGRESS";
export const LOAD_TODO_SUCCESS = "LOAD_TODO_SUCCESS";
export const LOAD_TODO_FAILURE = "LOAD_TODO_FAILURE";

export const createTodo = todo => ({
    type: CREATE_TODO,
    payload: { todo },
});

export const removeTodo = todo => ({
    type: REMOVE_TODO,
    payload: { todo }
});

export const markTodoAsCompleted = todo => ({
    type: MARK_TODO_AS_COMPLETED,
    payload: { todo }
});

export const loadTodoInProgress = () => ({
    type: LOAD_TODO_IN_PROGRESS
});

export const loadTodoSuccess = todos => ({
    type: LOAD_TODO_SUCCESS,
    payload: { todos }
});
export const loadTodoFailure = () => ({
    type: LOAD_TODO_FAILURE
});