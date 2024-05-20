# React-18-webpack-setup
Refer the following repostory README to setup React application using webpack https://github.com/sidlogin/react18-webpack-setup

## Mocked API response using json server:
1. Run `npx json-server db.json --port 3100` inside data folder

## Step-1 To integrate Redux with thunk middleware in React application:
1. To add Redux in to your React application install npm packages `npm i redux react-redux --save-dev`
2. Install following npm packages for `npm i redux-thunk @redux-devtools/extension @babel/runtime`
3. Install `npm i --save-dev @babel/plugin-transform-runtime`
4. Update .babelrc file to update plugin
5. Create store.js in src folder of you react application
6. Add following configuration in store.js `applyMiddleware`, `composeWithDevTools` and `thunk`
7. Create actions.js for store
8. Create reducers.js for store

### store.js configuration
```
import { createStore, combineReducers, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { todos } from './reducers';

const reducers = {
    todos
};

const rootReducer = combineReducers(reducers);
const middlewareEnhancer = applyMiddleware(thunk);
const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = composeWithDevTools(middlewareEnhancer)

export const configureStore = () => createStore(persistedReducer, composedEnhancers);
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
## Step-2 To Configure Redux persist
```
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { todos } from './reducers';

const reducers = {
    todos
};

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers(reducers);
const middlewareEnhancer = applyMiddleware(thunk);
const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composedEnhancers = composeWithDevTools(middlewareEnhancer)
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(persistedReducer, composedEnhancers);
```

## Step-3 Redux Thunk implemention:
1. Import requried `actions` in `thunk.js`
2. Create new thunk function, for example `addTodoRequest` and dispatch respective actions as needed.
3. Dispatch thunk function from component.

```
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
```

### Replace existing action with newly created thunk function in NewTodoForm component:
```
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text))
});
```

## Step-4 Redux Selector implemention:
1. Create `selectors.js` file under `redux` folder
2. Add respective `selectors` function in `selectors.js` file
3. Install the npm package 'reselect' to create new selectors using existing selector. npm i `reselect`.
4. Add the created selector in to TodoList component 

```
import { createSelector } from 'reselect';

export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted),
);

export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted),
);
```


