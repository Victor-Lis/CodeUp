import axios from "axios";

export const api = axios.create({
  baseURL: "http://codeup-php:80" //process.env.VALIDATOR_API_URL || "http://codeup-php:80",
});