import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './features/home/HomePage';
import AboutPage from './features/about/AboutPage';
import ServicesPage from './features/services/ServicesPage';
import FleetPage from './features/fleet/FleetPage';
import CareersPage from './features/careers/CareersPage';
import ContactPage from './features/contact/ContactPage';
import NewsPage from './features/news/NewsPage';
import ArticlePage from './features/news/ArticlePage';
import PrivacyPolicy from './features/legal/PrivacyPolicyPage';
import TermsConditions from './features/legal/TermsPage';
import CookiePolicy from './features/legal/CookiePolicyPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<ArticlePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
