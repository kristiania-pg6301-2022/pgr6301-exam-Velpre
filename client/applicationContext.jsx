import React from "react";
import { fetchJSON } from "./lib/http";

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
  async listArticles() {
    return fetchJSON(`/api/articles`);
  },

  async createArticle(article) {
    return await postJSON("/api/articles/new", article);
  },



  async logout(url, reload, navigate) {
    await fetch(url, { method: "delete" });
    reload();
    navigate("/");
  },
});
