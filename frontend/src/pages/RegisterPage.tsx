import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { authService } from "../authService";
import Notification from "../components/Notification";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);

    if (!email || !password || !confirmPassword) {
      setNotification({
        message: "Todos los campos son obligatorios",
        type: "error",
      });
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setNotification({
        message: "El correo no tiene un formato válido",
        type: "error",
      });
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setNotification({
        message: "La contraseña debe tener al menos 6 caracteres",
        type: "error",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setNotification({
        message: "Las contraseñas no coinciden",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      await authService.register({ email, password });
      setNotification({
        message: "Cuenta creada con éxito. Redirigiendo al inicio de sesión...",
        type: "success",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setNotification({ message: err.message, type: "error" });
      } else {
        setNotification({
          message: "Ocurrió un error inesperado",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
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
          sx={{ mb: 4, fontWeight: "bold", color: "#16222a" }}
        >
          Crear cuenta
        </Typography>

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 1,
              backgroundColor: "#16222a",
              "&:hover": { backgroundColor: "#1e2d36" },
              py: 1.4,
              fontWeight: "bold",
            }}
          >
            {loading ? "Cargando..." : "Registrarse"}
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
