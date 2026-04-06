const getApiUrl = () => {
    // 🌐 producción (Render, Netlify, etc)
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }

    // ☁️ Codespaces
    if (window.location.hostname.includes("app.github.dev")) {
        const host = window.location.hostname.replace("-5173", "-3000");
        return `https://${host}`;
    }

    // 💻 Local
    return "http://localhost:3000";
};

export const API_URL = getApiUrl();