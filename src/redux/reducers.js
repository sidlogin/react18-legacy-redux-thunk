import { CREATE_TODO, REMOVE_TODO, MARK_TODO_AS_COMPLETED } from "./action";

const initialState = [];
export const todos = (state = initialState, action) => {
    console.log(state, action)
    const { type, payload } = action;

    switch(type) {
        case CREATE_TODO: {
            return [
                ...state, 
                ...[{ ...payload, isCompleted: false}] 
            ];
        }
        case REMOVE_TODO: {
            return state.filter(todo => todo.text !== payload.text);
        }
        case MARK_TODO_AS_COMPLETED: {
            return state.map(todo => {
                if (todo.text === payload.text) {
                    return {
                        ...todo, isCompleted: true
                    };
                }
                return todo;
            });
        }
        default:
            return state;
    }
}