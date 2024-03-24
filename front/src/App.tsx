import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout, Loading } from './components';
import { HomePage, RegistrationPage, LoginPage, ConfirmationPage, OriginalContentPage } from '@/pages';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Layout>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/confirm" element={<ConfirmationPage />} />
          <Route path="/content" element={<OriginalContentPage />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;
