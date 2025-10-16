import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { authService } from "../authService.js";
import Notification from "../components/Notification.js"; // Ajusta la ruta

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification(null);
    setLoading(true);

    try {
      const data = await authService.login({ email, password });
      console.log(data);

      localStorage.setItem("token", data.token);

      setNotification({ message: data.message, type: "success" });
      // navigate("/dashboard");
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
          sx={{
            mb: 4,
            fontWeight: "bold",
            color: "#16222a",
          }}
        >
          Iniciar Sesión
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

          <Box sx={{ textAlign: "right" }}>
            <Link
              component={RouterLink}
              to="/forgot-password"
              underline="hover"
              sx={{ fontSize: 14, color: "#3a6073", cursor: "pointer" }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>

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
            {loading ? "Cargando..." : "Entrar"}
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
          ¿No tienes cuenta?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            sx={{ fontWeight: "bold", color: "#16222a" }}
          >
            Crear cuenta nueva
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default LoginPage;
