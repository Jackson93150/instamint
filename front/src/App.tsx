import { Route, Routes } from 'react-router-dom';

import { Layout } from './components';
import { HomePage, RegistrationPage, LoginPage } from '@/pages';

function App() {
  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
