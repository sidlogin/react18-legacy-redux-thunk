import React from 'react';
import './App.scss';
import TodoList from './components/todos/TodoList';

const App = () => {
    return (
        <div className="App">
            <TodoList />
        </div>
    )
}
export default App;