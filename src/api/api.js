import axios from "axios";

export default axios.create({
  baseURL: "http://loanpro-api.fly.dev/api/v1",
});
