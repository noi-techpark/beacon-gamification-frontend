export const API_CONFIG = {
  base_path:
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "localhost"
      ? "http://127.0.0.1:8000/api/v1"
      : "http://157.230.18.122/api/v1"
};
