import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/pages";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}

export default App;
