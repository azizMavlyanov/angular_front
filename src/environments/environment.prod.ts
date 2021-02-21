const API_URL = process.env.API_URL;

export const environment = {
  production: true,
  api: {
    base: API_URL,
    prefix: "/api/",
    authPrefix: "auth/",
    login: "login/",
    registration: "register/",
    entries: "articles",
    userEntries: "users",
    photoEntries: "photos"
  }
};
