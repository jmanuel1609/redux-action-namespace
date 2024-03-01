
import './App.css';
import TodoApp from './TodoApp'
import { Provider } from "react-redux";
import store from "./redux/store";
function App() {
  return (
    <Provider store={store}>
        <TodoApp/>
    </Provider>
  );
}

export default App;
