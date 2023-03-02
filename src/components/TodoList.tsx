import React from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import NewTodoForm from "./NewTodoForm";
import TodoItem from "./TodoItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todos.list);

  return (
    <ul>
      
      <div className="TodoListContainer">
        <Paper elevation={3}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Cart
          </Typography>
          {todos.map((todo) =>
            todo.cart ? (
              <div>
                <TodoItem key={todo.id} {...todo} />
              </div>
            ) : (
              <></>
            )
          )}{" "}
        </Paper>
        <Paper elevation={3}>
          {" "}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To do
          </Typography>
          {todos.map((todo) =>
            todo.completed ? (
              <></>
            ) : (
              <div>
                {todo.cart ? <></> : <TodoItem key={todo.id} {...todo} />}
              </div>
            )
          )}{" "}
        </Paper>
        <Paper elevation={3}>
          {" "}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Completed
          </Typography>
          {todos.map((todo) =>
            todo.completed ? (
              <div>
                {todo.cart ? <></> : <TodoItem key={todo.id} {...todo} />}
              </div>
            ) : (
              <></>
            )
          )}
        </Paper>

        {/* {todos.map((todo) => (
       
      ))}
      made
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))} */}
      </div>
    </ul>
  );
};

export default TodoList;
