# 🧩 Desafío Técnico — Recuperación de Contraseña

Este desafío consiste en implementar un flujo simple de **recuperación y cambio de contraseña** usando un entorno **totalmente autocontenido con Docker**.

Queremos ver cómo organizás el código, los commits y cómo hacés que todo el sistema (backend, frontend, base de datos y servidor de correo local) funcione de punta a punta.

---

## 🎯 Objetivo del Desafío

El sistema debe permitir a un usuario recuperar su contraseña a través de un email de restablecimiento.  
El flujo básico es el siguiente:

1. En la pantalla de **login**, el usuario ve un enlace **“Olvidé mi contraseña”**.  
2. Ingresa su **email** y envía la solicitud.  
3. El sistema genera un enlace y **envía un correo** (a un servidor local de prueba).  
4. El usuario abre ese enlace y puede ingresar una **nueva contraseña**.  
5. Luego puede volver a loguearse con la nueva contraseña.

> No es necesario implementar validaciones de seguridad avanzadas ni autenticación real.  
> Lo importante es que el flujo completo funcione y sea fácil de levantar.

---

## 🧠 Qué queremos evaluar

- Que el repositorio sea autocontenido (sin pasos manuales raros).
- Que entiendas cómo conectar un frontend y un backend.
- Que sepas manejar commits claros y un README útil.
- Que el código sea limpio y fácil de seguir.

---

## ⚙️ Tecnologías a utilizar

| Componente | Tecnología recomendada |
|-------------|------------------------|
| Backend | Node.js + Express |
| Base de datos | MySQL |
| Frontend | React (con Vite) |
| Servidor de correos | [Mailpit](https://github.com/axllent/mailpit) (para ver los emails enviados) |
| Contenedores | Docker + Docker Compose |

---

## 🧩 Qué debe incluir la solución

### 🖥️ Backend (Node.js + Express)

- Endpoint `POST /auth/forgot-password` → recibe `{ email }` y envía un correo con enlace de reseteo.  
- Endpoint `POST /auth/reset-password` → recibe `{ email, newPassword }` y actualiza la contraseña.  
- Guardar usuarios en una tabla simple con `email` y `password`.
- Usar **Nodemailer** para enviar correos apuntando al servidor Mailpit.
- Las credenciales de conexión deben configurarse mediante variables de entorno (`.env`).

### 💻 Frontend (React)

- Página **Login** con un enlace “Olvidé mi contraseña”.
- Página **Recuperar contraseña** con un campo para email.
- Página **Restablecer contraseña** con dos campos para ingresar la nueva contraseña.
- Mensajes claros de éxito o error.

### 🐳 Docker

El proyecto debe incluir un archivo **`docker-compose.yml`** que levante los siguientes servicios:

- `backend` → servidor Express  
- `frontend` → app React  
- `db` → base de datos MySQL  
- `mailpit` → para capturar y ver los correos enviados

Todo debe funcionar con el comando:

```bash
docker compose up --build
```

