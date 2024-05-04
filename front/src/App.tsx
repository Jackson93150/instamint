import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout, Loading } from './components';
import {
  HomePage,
  RegistrationPage,
  LoginPage,
  SettingsPage,
  ConfirmationPage,
  OriginalContentPage,
  ProfilePage,
  NftPage,
} from '@/pages';

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
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/me" element={<ProfilePage />} />
          <Route path="/minter/:uniqueUrl" element={<ProfilePage />} />
          <Route path="/nft/:tokenId" element={<NftPage />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}

export default App;
