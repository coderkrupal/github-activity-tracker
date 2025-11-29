import fetch from "node-fetch";
import { config } from "../config/github.js";

export const createIssue = async (title, body, labels = []) => {
  const url = `${config.apiBase}/repos/${config.owner}/${config.repo}/issues`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      Accept: "application/vnd.github+json",
    },
    body: JSON.stringify({ title, body, labels }),
  });

  return response.json();
};