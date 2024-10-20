import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { login, changePassword } from "../services/authService"; // Importando o serviço de autenticação

interface LoginFormProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await login(email, password); // Usando a função `login` da service
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await changePassword(email, password, newPassword); // Usando a função `changePassword` da service
      setSuccessMessage("Password changed successfully.");
    } catch (error) {
      setErrorMessage("Password change failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h5" component="h2" gutterBottom>
          {isChangingPassword ? "Change Password" : "Login"}
        </Typography>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <form
          onSubmit={isChangingPassword ? handleChangePassword : handleLogin}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label={isChangingPassword ? "Current Password" : "Password"}
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {isChangingPassword && (
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {isChangingPassword ? "Change Password" : "Login"}
          </Button>
        </form>

        <Button
          onClick={() => setIsChangingPassword(!isChangingPassword)}
          sx={{ marginTop: 2 }}
        >
          {isChangingPassword ? "Back to Login" : "Change Password"}
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
