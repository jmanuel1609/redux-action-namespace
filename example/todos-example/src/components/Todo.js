import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import actions from '../redux/todoActionsAndReducers'

const Todo = ({ todo, toggleTodo }) => (
  <li className="todo-item" onClick={() => toggleTodo(todo.id)}>
    {todo && todo.completed ? "👌" : "👋"}{" "}
    <span
      className={cx(
        "todo-item__text",
        todo && todo.completed && "todo-item__text--completed"
      )}
    >
      {todo.content}
    </span>
  </li>
);

// export default Todo;
export default connect(null, (dispatch => ({
    toggleTodo:(payload) => dispatch(actions.TOGGLE_TODO.call(payload))
})))( Todo);
