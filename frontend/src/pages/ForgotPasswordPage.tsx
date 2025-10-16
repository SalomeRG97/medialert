import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { authService } from "../authService";
import Notification from "../components/Notification";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
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
      const data = await authService.forgotPassword({ email });
      setNotification({
        message:
          data.message ||
          "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
        type: "success",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setNotification({ message: err.message, type: "error" });
      } else {
        setNotification({
          message:
            "Ocurrió un error al procesar la solicitud. Intenta nuevamente.",
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
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#16222a" }}
        >
          Recuperar Contraseña
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 3, textAlign: "center", color: "text.secondary" }}
        >
          Ingresa tu correo electrónico y te enviaremos un enlace para
          restablecer tu contraseña.
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
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              backgroundColor: "#16222a",
              "&:hover": { backgroundColor: "#1e2d36" },
              py: 1.3,
              fontWeight: "bold",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Enviar enlace"
            )}
          </Button>
        </form>

        <Typography variant="body2" sx={{ mt: 3 }}>
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ color: "#16222a" }}
          >
            Volver al inicio de sesión
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default ForgotPasswordPage;
