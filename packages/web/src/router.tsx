import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PlatformsPage from './pages/PlatformsPage';
import PlatformDetail from './pages/PlatformDetail';
import PromotionsPage from './pages/PromotionsPage';
import ContributePage from './pages/ContributePage';
import AboutPage from './pages/AboutPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="platforms" element={<PlatformsPage />} />
        <Route path="platforms/:slug" element={<PlatformDetail />} />
        <Route path="promotions" element={<PromotionsPage />} />
        <Route path="contribute" element={<ContributePage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
