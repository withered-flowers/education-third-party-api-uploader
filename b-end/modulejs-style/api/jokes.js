import axios from "axios";

export const jokesApi = axios.create({
  baseURL: "https://v2.jokeapi.dev/joke",
});
