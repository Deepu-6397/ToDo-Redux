import './App.css';
import Todo from './components/todo';
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <div className="app-outer-card">
      <Provider store={store}>
        <div className="app-inner-card">
          <Todo />
        </div>
      </Provider>
    </div>
  );
}

export default App;
