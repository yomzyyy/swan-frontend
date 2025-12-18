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
import LoginPage from './features/admin/LoginPage';
import AdminLayout from './features/admin/AdminLayout';
import AdminDashboard from './features/admin/AdminDashboard';
import NewsListAdmin from './features/admin/news/NewsListAdmin';
import NewsFormAdmin from './features/admin/news/NewsFormAdmin';
import FleetListAdmin from './features/admin/fleet/FleetListAdmin';
import FleetFormAdmin from './features/admin/fleet/FleetFormAdmin';
import CareersListAdmin from './features/admin/careers/CareersListAdmin';
import CareersFormAdmin from './features/admin/careers/CareersFormAdmin';
import ProtectedRoute from './components/admin/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          {/* Public routes with Navbar and Footer */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <AboutPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <ServicesPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/fleet"
            element={
              <>
                <Navbar />
                <FleetPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/careers"
            element={
              <>
                <Navbar />
                <CareersPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <ContactPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <Navbar />
                <NewsPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/news/:slug"
            element={
              <>
                <Navbar />
                <ArticlePage />
                <Footer />
              </>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <>
                <Navbar />
                <PrivacyPolicy />
                <Footer />
              </>
            }
          />
          <Route
            path="/terms-conditions"
            element={
              <>
                <Navbar />
                <TermsConditions />
                <Footer />
              </>
            }
          />
          <Route
            path="/cookie-policy"
            element={
              <>
                <Navbar />
                <CookiePolicy />
                <Footer />
              </>
            }
          />

          {/* Admin login route (no Navbar/Footer) */}
          <Route path="/system-access" element={<LoginPage />} />

          {/* Protected admin routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />

                    {/* News Management */}
                    <Route path="news" element={<NewsListAdmin />} />
                    <Route path="news/create" element={<NewsFormAdmin />} />
                    <Route path="news/edit/:id" element={<NewsFormAdmin />} />

                    {/* Fleet Management */}
                    <Route path="fleet" element={<FleetListAdmin />} />
                    <Route path="fleet/create" element={<FleetFormAdmin />} />
                    <Route path="fleet/edit/:id" element={<FleetFormAdmin />} />

                    {/* Careers Management */}
                    <Route path="careers" element={<CareersListAdmin />} />
                    <Route path="careers/create" element={<CareersFormAdmin />} />
                    <Route path="careers/edit/:id" element={<CareersFormAdmin />} />

                    {/* Phase 6-7: More admin routes will be added here */}
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
