/* eslint-disable no-console */
import { useEffect } from "react";

import { HealthCheck } from "@/services";

export const HomePage = () => {
  useEffect(() => {
    // Define the URL of your server
    console.log(import.meta.env.VITE_BACKEND_URL);
    HealthCheck;
    console.log("after");
  }, []);
  return (
    <div>
      <p>React Template test</p>
    </div>
  );
};
