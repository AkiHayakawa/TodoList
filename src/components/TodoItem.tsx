import React from "react";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { useAppDispatch } from "../hook";
import { editNewTodo, toggleCart, toggleStatus } from "../store/todoSlice";
import TextField from "@mui/material/TextField";
interface TodoItemProps {
  id: string;
  title: string;
  completed: boolean;
  cart: boolean;
}

const TodoItem: React.FC<TodoItemProps> = (todo) => {
  const dispatch = useAppDispatch();
  const [text, setText] = useState(todo.title);

  function edit(product: TodoItemProps) {
    product = {
      id: product.id,
      title: text,
      completed: todo.completed,
      cart: todo.cart,
    };
    setText("");
    dispatch(editNewTodo(product));
  }
  return (
    <div className="TodoItemBlock">
      <li>
        {todo.completed ? (
          <CheckCircleIcon onClick={() => dispatch(toggleStatus(todo))} />
        ) : (
          <CheckCircleOutlineIcon
            onClick={() => dispatch(toggleStatus(todo))}
          />
        )}

        <TextField
          id="outlined-multiline-flexible"
          multiline
          maxRows={4}
          defaultValue={text}
          onChange={(e) => setText(e.target.value)}
          className={todo.completed ? "checked" : "no"}
        />
        <SaveAsIcon
          onClick={() => {
            edit(todo);
          }}
        />
        {todo.cart ? (
          <DeleteForeverIcon onClick={() => dispatch(toggleCart(todo))} />
        ) : (
          <DeleteIcon onClick={() => dispatch(toggleCart(todo))} />
        )}
      </li>
    </div>
  );
};

export default TodoItem;
