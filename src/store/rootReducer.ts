import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  AnyAction,
} from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = "http://34.172.10.128/docs/?format=openapi";
const config = {
  headers: {
    "Content-Type": "application/json",
  },
};
type Todo = {
  id: string;
  title: string;
  completed: boolean;
  cart: boolean;
};
type Login = {
  email: string;
  password: string;
};

type AuthMentor = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
  type: string;
  experience: string;
  audience: string;
};
type Auth = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
};
type Recovery = {
  email: string;
  password: string;
  password2: string;
};
type TodosState = {
  list: Todo[];
  loading: boolean;
  error: string | null;
};

export const registerUser = createAsyncThunk<
  Todo,
  Auth,
  { rejectValue: string }
>("todos/registerUser", async (user) => {
  let formData = new FormData();
  formData.append("first_name", user.first_name);
  formData.append("last_name", user.last_name);
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("password2", user.password2);

  const { data } = await axios.post(
    `http://34.172.10.128/api/v1/account/register/`,
    formData,
    config
  );
  localStorage.setItem("userToken", data.userToken);
  return data;
});
export const loginUser = createAsyncThunk<Todo, Login, { rejectValue: string }>(
  "todos/loginUser",
  async (user) => {
    let formData = new FormData();
    formData.append("email", user.email);
    formData.append("password", user.password);
    const { data } = await axios.post(
      `http://34.172.10.128/api/v1/account/login/`,
      formData,
      config
    );
    localStorage.setItem("userToken", JSON.stringify(data));
    return data;
  }
);
export const forgotPassword = createAsyncThunk<
  undefined,
  string,
  { rejectValue: string }
>("todos/forgotPassword", async (email) => {
  let formData = new FormData();
  formData.append("email", email);
  return await axios.post(
    `http://34.172.10.128/api/v1/account/forgot_password/`,
    formData,
    config
  );
});
export const recoveryPassword = createAsyncThunk<
  undefined,
  Recovery,
  { rejectValue: string }
>("todos/recoveryPassword", async (user) => {
  let formData = new FormData();
  formData.append("email", user.email);
  formData.append("password", user.password);
  formData.append("password_confirm", user.password2);
  console.log(user);
  return await axios.post(
    `http://34.172.10.128/api/v1/account/forgot_password_confirm/`,
    formData,
    config
  );
});
export const registerMentor = createAsyncThunk<
  Todo,
  AuthMentor,
  { rejectValue: string }
>("todos/registerMentor", async (user) => {
  let formData = new FormData();
  formData.append("email", user.email);

  formData.append("first_name", user.first_name);
  formData.append("last_name", user.last_name);
  formData.append("password", user.password);
  formData.append("password2", user.password2);
  formData.append("type", user.type);
  formData.append("experience", user.experience);
  formData.append("audience", user.audience);

  const { data } = await axios.post(
    `http://34.172.10.128/api/v1/account/register/mentor/`,
    formData,
    config
  );
  localStorage.setItem("userToken", data.userToken);
  return data;
});
const initialState: TodosState = {
  list: [],
  loading: false,
  error: null,
};

const rootReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default rootReducer.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}
