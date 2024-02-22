/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";

export const HealthCheck = () => {
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}/healthz`)
    .then((response) => {
      // Handle successful response
      console.log("Health check successful:", response.data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error fetching health check:", error);
    });
};
