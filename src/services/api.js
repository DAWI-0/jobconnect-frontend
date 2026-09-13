import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // IMPORTANT :
    // Si on envoie FormData, on ne doit PAS forcer
    // Content-Type: application/json.
    // Le navigateur/Axios va automatiquement ajouter :
    // multipart/form-data; boundary=...
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Si pas d'erreur 401, on retourne simplement l'erreur
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Évite une boucle infinie
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/accounts/refresh/",
        {
          refresh: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newAccessToken = response.data.access;

      localStorage.setItem("access_token", newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Si la requête originale contenait FormData,
      // on conserve son body.
      return api(originalRequest);
    } catch (refreshError) {
      localStorage.clear();
      window.location.href = "/login";

      return Promise.reject(refreshError);
    }
  }
);

export default api;