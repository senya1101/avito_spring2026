import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Skeleton, Layout } from 'antd';

import { store } from '@store/store';
import { MainLayout } from '@components/MainLayout';

import 'antd/dist/reset.css';
import './index.css';

const HomePage = lazy(() =>
  import('@pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const AdsPage = lazy(() =>
  import('@pages/AdsPage').then((m) => ({ default: m.AdsPage })),
);
const AdPage = lazy(() =>
  import('@pages/AdPage').then((m) => ({ default: m.AdPage })),
);
const EditAdPage = lazy(() =>
  import('@pages/EditAdPage').then((m) => ({ default: m.EditAdPage })),
);
const NotFoundPage = lazy(() =>
  import('@pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

const PageLoader = () => (
  <Layout style={{ padding: '24px' }}>
    <Skeleton active paragraph={{ rows: 10 }} />
  </Layout>
);

export const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="ads" element={<AdsPage />} />
            <Route path="ads/:id" element={<AdPage />} />
            <Route path="ads/:id/edit" element={<EditAdPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
