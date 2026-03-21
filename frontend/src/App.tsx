import { AdPage } from '@pages/AdPage';
import { AdsPage } from '@pages/AdsPage';
import { EditAdPage } from '@pages/EditAdPage';
import { HomePage } from '@pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ads" element={<AdsPage />} />
      <Route path="/ads/:id" element={<AdPage />} />
      <Route path="/ads/:id/edit" element={<EditAdPage />} />
    </Routes>
  </BrowserRouter>
);
