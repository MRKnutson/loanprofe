import axios from "axios";

export default axios.create({
  baseURL: "//loanpro-api.fly.dev/api/v1",
  // baseURL: "http://localhost:8080/api/v1",
});

// If using locally correct baseURL to baseURL: "http://localhost:8080/api/v1",
