import {
    CREATE_TODO,
    REMOVE_TODO,
    MARK_TODO_AS_COMPLETED,
    LOAD_TODO_FAILURE,
    LOAD_TODO_IN_PROGRESS,
    LOAD_TODO_SUCCESS
} from "./action";

const initialState = [];

export const isLoading = (state = false, action) => {
    const { type } = action;

    switch (type) {
    case LOAD_TODO_IN_PROGRESS:
        return true;
    case LOAD_TODO_SUCCESS:
    case LOAD_TODO_FAILURE:
        return false;
    default:
        return state;
    }
}

export const todos = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case CREATE_TODO: {
            const { todo } = payload;
            return state.concat(todo);
        }
        case REMOVE_TODO: {
            return state.filter(todo => todo.id !== payload.todo.id);
        }
        case MARK_TODO_AS_COMPLETED: {
            return state.map(todo => {
                if (todo.id === payload.todo.id) {
                    return payload.todo;
                }
                return todo;
            });
        }
        case LOAD_TODO_SUCCESS: {
            const { todos } = payload;
            return todos;
        }
        case LOAD_TODO_IN_PROGRESS:
        case LOAD_TODO_FAILURE:
        default:
            return state;
    }
}