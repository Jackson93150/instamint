import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { HomePage, RegistrationPage, LoginPage } from '@/pages';

function App() {
  return (
    <Routes>
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
