import React from "react";
import { fetchJSON, postJSON } from "./lib/http";

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

  async deleteArticle(article) {
    return await postJSON("/api/articles/delete", article);
  },

  async updateArticle(article) {
    return await postJSON("/api/articles/update", article);
  },

  async logout(url, reload, navigate) {
    await fetch(url, { method: "delete" });
    reload();
    navigate("/");
  },
});
