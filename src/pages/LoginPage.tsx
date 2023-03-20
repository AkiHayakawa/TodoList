import React, { useState } from "react";
import { loginUser } from "../store/rootReducer";
import { useAppDispatch } from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const CreateUser = () => {
    if (!email || !password) {
      alert("Строки должны бытб заполнены");
    } else {
      let Auth = {
        email: email,
        password: password,
      };
      dispatch(loginUser(Auth));
      setEmail("");
      setPassword("");
    }
  };
  const { t } = useTranslation();

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <h2>{t("Login")}</h2>

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
            label="email"
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
        </Box>

        <Button variant="contained" size="medium" onClick={() => CreateUser()}>
          {t("Login")}
        </Button>
        <h3>
          <a href="/recoveryPass">{t("Forgot your password?")}</a>
        </h3>
        <h4>
          {t("Don't have an account yet?")}

          <a href="/registr">{t("Registr")} </a>
        </h4>
      </div>
    </div>
  );
};

export default LoginPage;
