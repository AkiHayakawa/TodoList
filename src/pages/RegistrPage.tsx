import React, { useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { registerUser } from "../store/rootReducer";
import { useAppDispatch } from "../hooks/useDebounce";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const CreateUser = () => {
    if (!first_name || !last_name || !email || !password || !password2) {
      alert("Строки должны бытб заполнены");
    } else {
      let Auth = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
        password2: password2,
      };
      dispatch(registerUser(Auth));
      setFirst_name("");
      setLast_name("");
      setEmail("");
      setPassword("");
      setPassword2("");
    }
  };
  const { t } = useTranslation();

  return (
    <div className="RegistrPage">
      <h3>{t("Register and start learning")}</h3>

      <div className="RegisterBlock">
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic"
            label={t("first_name")}
            variant="outlined"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label={t("last_name")}
            variant="outlined"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label={t("email")}
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label={t("password")}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label={t("password2")}
            variant="outlined"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Box>
        <p>
          <input type="checkbox" name="" id="" />
          {t("Send me special offers")}
        </p>
        <Button variant="contained" size="medium" onClick={() => CreateUser()}>
          {t("Registr")}
        </Button>

        <h4>
          {t("Already have an account?")}
          <a href="/login"> {t("Login")}</a>
        </h4>
      </div>
    </div>
  );
};

export default AuthPage;
