interface Data {
  email: string;
  password: string;
}

const API_URL = "http://localhost:4000/routes"; // Ajusta según tu backend

export const authService = {
  login: async (data: Data) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al iniciar sesión");
    }

    return await response.json(); // normalmente devuelve { token, user, ... }
  },

  register: async (data: Data) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error al registrarse");
    }

    return await response.json();
  },

  logout: () => {
    localStorage.removeItem("token");
    // aquí podrías limpiar también el estado global o contexto si lo usas
  },
};
