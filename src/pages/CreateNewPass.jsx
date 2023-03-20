import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useDebounce";
import { recoveryPassword } from "../store/rootReducer";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CreateNewPass = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const CreateUser = () => {
    if (!email || !password || !password2) {
      alert("Строки должны быть заполнены");
    } else {
      let Auth = {
        email: email,

        password: password,
        password2: password2,
      };
      navigate("/login");

      setEmail("");
      setPassword("");
      setPassword2("");
      dispatch(recoveryPassword(Auth));
      navigate("/login");
    }
  };
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <div className="LoginPage">
        <div className="LoginContainer">
          <h2>{t("Reset the password")}</h2>

          <div>
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              className="TextFieldMui"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={t("password")}
              className="TextFieldMui"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label={t("password2")}
              className="TextFieldMui"
              variant="outlined"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />

            <Button
              variant="contained"
              size="medium"
              onClick={() => {
                CreateUser();
              }}
            >
              {t("send")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNewPass;
