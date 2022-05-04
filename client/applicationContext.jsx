import React from "react";
import { fetchJSON } from "./http";
import { useNavigate } from "react-router-dom";

async function postJSON(url, object) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(object),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${res.status}: ${res.statusText}`);
  }
}

export const ApplicationContext = React.createContext({
  async fetchLogin() {
    return await fetchJSON("/api/login");
  },

  async registerLogin(provider, login) {
    return await postJSON(`/api/login/${provider}`, login);
  },
  /*
  async listMovies() {
    return fetchJSON(`/api/movies`);
  },
  async createMovie(movie) {
    return await postJSON("/api/movies/new", movie);
  },

   */

  async logout(url, reload, navigate) {
    await fetch(url, { method: "delete" });
    reload();
    navigate("/");
  },
});
