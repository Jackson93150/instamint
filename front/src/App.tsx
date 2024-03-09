import { Route, Routes } from 'react-router-dom';

import { HomePage, RegistrationPage, LoginPage } from '@/pages';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
