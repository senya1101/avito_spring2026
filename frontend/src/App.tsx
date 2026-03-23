import { MainLayout } from '@components/MainLayout';
import { AdPage } from '@pages/AdPage';
import { AdsPage } from '@pages/AdsPage';
import { EditAdPage } from '@pages/EditAdPage';
import { HomePage } from '@pages/HomePage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'antd/dist/reset.css';
import './index.css';

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/ads/:id" element={<AdPage />} />
          <Route path="/ads/:id/edit" element={<EditAdPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
