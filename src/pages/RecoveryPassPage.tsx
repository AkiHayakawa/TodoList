import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { forgotPassword } from "../store/rootReducer";
import { useAppDispatch } from "../hooks/useDebounce";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RecoveryPassPage = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  let res = email;
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="ForgetPasswordPage">
      <h2>{t("Forgot your password?")}</h2>
      <div className="ForgetPasswordContainer">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          className="TextFieldMui"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Collapse in={open}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {t("letter")}
          </Alert>
        </Collapse>
        <Button
          variant="contained"
          size="medium"
          disabled={open}
          onClick={() => {
            dispatch(forgotPassword(res)), setOpen(true);
          }}
        >
          {t("Reset the password")}
        </Button>
        <h4>
          {t("or")}
          <a href="/login"> {t("sign in")} </a>
        </h4>
      </div>
    </div>
  );
};

export default RecoveryPassPage;
