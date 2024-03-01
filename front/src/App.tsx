import { Route, Routes } from 'react-router-dom';

import { HomePage, RegistrationPage } from '@/pages';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/registration" element={<RegistrationPage />} />
    </Routes>
  );
}

export default App;
