import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!validateEmail(email)) {
      setError("El correo no tiene un formato válido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Simulación de éxito
    setSuccess("Cuenta creada con éxito. Redirigiendo al inicio de sesión...");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 6,
          borderRadius: 4,
          width: { xs: 320, sm: 420 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(6px)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#16222a",
          }}
        >
          Crear cuenta
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />

          {error && (
            <Alert severity="error" sx={{ mt: 1 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 1 }}>
              {success}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              backgroundColor: "#16222a",
              "&:hover": { backgroundColor: "#1e2d36" },
              py: 1.4,
              fontWeight: "bold",
            }}
          >
            Registrarse
          </Button>
        </form>

        <Box
          sx={{
            width: "100%",
            height: 1,
            backgroundColor: "rgba(0,0,0,0.1)",
            my: 3,
          }}
        />

        <Typography variant="body2">
          ¿Ya tienes una cuenta?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ fontWeight: "bold", color: "#16222a" }}
          >
            Inicia sesión
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
