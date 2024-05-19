# React-18-webpack-setup
Refer the following repostory README to setup React application using webpack https://github.com/sidlogin/react18-webpack-setup

## Mocked API response using json server:
1. Run `npx json-server db.json --port 3100` inside data folder

## Steps to integrate Redux in React application:
1. To add Redux in to your React application install npm packages `npm i redux react-redux --save-dev`
2. Create store.js in src folder of you react application
3. Create actions for store
4. Create reducer for store

## Configure Redux persist
1. Import below packages in store.js
2. 

```
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
```

### store.js configuration
```
import { createStore, compbineReducers } from 'redux';

const reducers = {};
const rootReducer = compbineReducers(reducers);

export const configureStore = () => createStore(rootReducer);
```

### Add store in to index.js
```
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>
);
```

### Create actions 
```
export const CREATE_TODO = "CREATE_TODO";
export const createTodo = text => {
    return ({
        type: CREATE_TODO,
        payload: { text }
    });
};
```

### Create reducers 
```
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
```

### Dispatch action to the redcuer
1. Create `mapStateToProps` and `mapDispatchToProps` 
2. Import `connect` function from `react-redux` and pass `mapStateToProps` and `mapDispatchToProps` parameters
3. Import `createTodo` action
4. Dispatch action to the reducer using `onCreatePressed` method.

```
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../../redux/action';
import './NewTodoForm.css';

const NewTodoForm = ({todos, onCreatePressed}) => {
    const [inputValue, setInputValue] = useState('');
    return (
        <div className='new-todo-form'>
            <input
                type="text"
                placeholder="Type your new todo here"
                className="new-todo-input"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
            />
            <button
                onClick={() => {
                    const isDuplicateText = todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
                className="new-todo-button">
                Create Todo
            </button>
        </div>
    );
};

const mapStateToProps = state => ({
    todos: state.todos,
});

const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(createTodo(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
```


