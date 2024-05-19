import { CREATE_TODO, REMOVE_TODO } from "./action";

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
        default:
            return state;
    }
}