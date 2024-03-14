import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { HomePage, RegistrationPage, LoginPage, ConfirmationPage } from '@/pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirm" element={<ConfirmationPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
