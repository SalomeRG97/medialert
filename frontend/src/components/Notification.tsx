import React from "react";
import { Alert, Collapse } from "@mui/material";

interface NotificationProps {
  message: string | null;
  type?: "success" | "error";
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "error",
  onClose,
}) => {
  return (
    <Collapse in={!!message}>
      {message && (
        <Alert severity={type} onClose={onClose} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
    </Collapse>
  );
};

export default Notification;
