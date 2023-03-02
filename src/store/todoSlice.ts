import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import axios from "axios";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  cart: boolean;
};

type TodosState = {
  list: Todo[];
  loading: boolean;
  error: string | null;
};

export const fetchTodos = createAsyncThunk<
  Todo[],
  undefined,
  { rejectValue: string }
>("todos/fetchTodos", async (_) => {
  const { data } = await axios("http://localhost:8000/posts");

  return data;
});
export const addNewTodo = createAsyncThunk<
  Todo,
  string,
  { rejectValue: string }
>("todos/addNewTodo", async function (text) {
  const todo = {
    title: text,

    completed: false,
  };
  const response = await axios.post("http://localhost:8000/posts", todo);
  return response.data;
});
export const editNewTodo = createAsyncThunk<
  Todo[],
  Todo,
  { rejectValue: string }
>("todos/editNewTodo", async function (product) {
  await axios.patch(`http://localhost:8000/posts/${product.id}`, product);
  const { data } = await axios("http://localhost:8000/posts");

  return data;
});
export const toggleStatus = createAsyncThunk<
  Todo[],
  Todo,
  { rejectValue: string }
>("todos/toggleStatus", async function (product) {
  await axios.patch(`http://localhost:8000/posts/${product.id}`, {
    completed: !product.completed,
  });
  const { data } = await axios("http://localhost:8000/posts");

  return data;
});
export const toggleCart = createAsyncThunk<
  Todo[],
  Todo,
  { rejectValue: string }
>("todos/toggleCart", async function (product) {
  product.cart
    ? await axios.delete(`http://localhost:8000/posts/${product.id}`)
    : await axios.patch(`http://localhost:8000/posts/${product.id}`, {
        cart: !product.cart,
      });

  const { data } = await axios("http://localhost:8000/posts");

  return data;
});
export const deleteTodo = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("todos/deleteTodo", async function (id) {
  await axios.delete(`http://localhost:8000/posts/${id}`);

  return id;
});

const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(addNewTodo.pending, (state) => {
        state.error = null;
      })
      .addCase(addNewTodo.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editNewTodo.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(toggleStatus.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(toggleCart.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.list = state.list.filter((todo) => todo.id !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default todoSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
