# 🧩 Desafío Técnico — Recuperación de Contraseña

Este proyecto es una prueba técnica que implementa un flujo de recuperación y cambio de contraseña usando un entorno totalmente autocontenido con Docker.

El objetivo es permitir a un usuario recuperar su contraseña a través de un email de restablecimiento, simulando un flujo completo de autenticación simple.

---

## 📦 Tecnologías utilizadas

| Componente         | Tecnología              |
| ------------------ | ----------------------- |
| Backend            | Node.js + Express       |
| Base de datos      | MySQL                   |
| Frontend           | React (Vite)            |
| Servidor de correo | Mailpit                 |
| Contenedores       | Docker + Docker Compose |

---

## 🚀 Funcionalidades implementadas

1. Login simple

   - Valida correo y contraseña.
   - Muestra mensaje de login exitoso.

2. Registro de usuario

   - Validación básica de email y contraseña.
   - Hash de contraseña con bcrypt.

3. Recuperación de contraseña

   - Forgot Password: envía un enlace al email registrado.
   - Reset Password: permite establecer nueva contraseña usando el token.

4. Notificaciones frontend

   - Componente Notification para mensajes de éxito o error.
   - Mensajes se cierran automáticamente después de unos segundos.

5. Dockerizado
   - Servicios backend, frontend, base de datos y servidor de correo.

---

## ⚙️ Instalación y ejecución

1. Clonar repositorio
   git clone <URL_DEL_REPOSITORIO>
   cd <carpeta-del-proyecto>

2. Copiar los archivos de ejemplo de variables de entorno y ajustarlos:
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env

3. Levantar todos los servicios con Docker Compose
   docker compose up --build

Esto levantará:

- MySQL en el puerto 3306
- Backend en el puerto 4000
- Frontend en el puerto 5173
- Mailpit en los puertos 8025 (web) y 1025 (SMTP)

4. Abrir el frontend

   - Docker Desktop te mostrará la URL asignada.
   - Acceder a esa URL para usar la aplicación.

5. Abrir Mailpit
   - Web: http://localhost:8025
   - Aquí podrás ver los correos enviados para restablecer contraseña.

---

## 👤 Usuarios de prueba

Los usuarios están cargados mediante seed:
| Email | Password |
| ------------------------------------------- | ----------- |
| admin@tech.com | 123456 |

Esto permite probar login y recuperación de contraseña sin necesidad de registrar usuarios manualmente.

---

## 📝 Endpoints del backend

| Endpoint           | Método | Descripción                                  | Body                     |
| ------------------ | ------ | -------------------------------------------- | ------------------------ |
| `/register`        | POST   | Registrar un nuevo usuario                   | `{ email, password }`    |
| `/login`           | POST   | Login simple                                 | `{ email, password }`    |
| `/forgot-password` | POST   | Solicitar enlace para restablecer contraseña | `{ email }`              |
| `/reset-password`  | POST   | Restablecer contraseña usando token          | `{ token, newPassword }` |

---

## 📝 Probar el flujo completo

1. Ingresar con el usuario de prueba:

   - Email: admin@tech.com
   - Password: 123456

2. Click en “Olvidé mi contraseña” en la pantalla de login.
3. Ingresar el email de prueba y enviar la solicitud.
4. Abrir Mailpit (http://localhost:8025) y hacer click en el enlace recibido.
5. Ingresar una nueva contraseña y confirmar.
6. Volver a login e iniciar sesión con la nueva contraseña.

---

## 🔧 Variables de entorno (backend/.env)

PORT=4000
DB_HOST=db
DB_USER=root
DB_PASSWORD=123456
DB_NAME=techchallenge
MAIL_HOST=mailpit
MAIL_PORT=1025
FRONTEND_URL=http://localhost:5173

---

## 🔧 Variables de frontend (frontend/.env)

VITE_BACKEND_URL=http://localhost:4000/api
