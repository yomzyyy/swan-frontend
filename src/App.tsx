import { lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/common';
import { ProtectedRoute } from './components/admin';
import PublicLayout from './app/layouts/PublicLayout';
import AdminLayout from './app/layouts/AdminLayout';

// Public pages - lazy loaded
const HomePage = lazy(() => import('./features/home/HomePage'));
const AboutPage = lazy(() => import('./features/about/AboutPage'));
const ServicesPage = lazy(() => import('./features/services/ServicesPage'));
const FleetPage = lazy(() => import('./features/fleet/FleetPage'));
const CareersPage = lazy(() => import('./features/careers/CareersPage'));
const JobApplicationForm = lazy(() => import('./features/careers/JobApplicationForm'));
const ContactPage = lazy(() => import('./features/contact/ContactPage'));
const NewsPage = lazy(() => import('./features/news/NewsPage'));
const ArticlePage = lazy(() => import('./features/news/ArticlePage'));
const PrivacyPolicy = lazy(() => import('./features/legal/PrivacyPolicyPage'));
const TermsConditions = lazy(() => import('./features/legal/TermsPage'));
const CookiePolicy = lazy(() => import('./features/legal/CookiePolicyPage'));
const NotFoundPage = lazy(() => import('./features/notfound/NotFoundPage'));

// Admin pages - lazy loaded
const LoginPage = lazy(() => import('./features/admin/LoginPage'));
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard'));
const NewsListAdmin = lazy(() => import('./features/admin/news/NewsListAdmin'));
const NewsFormAdmin = lazy(() => import('./features/admin/news/NewsFormAdmin'));
const FleetListAdmin = lazy(() => import('./features/admin/fleet/FleetListAdmin'));
const FleetFormAdmin = lazy(() => import('./features/admin/fleet/FleetFormAdmin'));
const CareersListAdmin = lazy(() => import('./features/admin/careers/CareersListAdmin'));
const CareersFormAdmin = lazy(() => import('./features/admin/careers/CareersFormAdmin'));
const AboutContentAdmin = lazy(() => import('./features/admin/content/AboutContentAdmin'));
const HomeContentAdmin = lazy(() => import('./features/admin/content/HomeContentAdmin'));
const ServicesContentAdmin = lazy(() => import('./features/admin/content/ServicesContentAdmin'));
const CareersContentAdmin = lazy(() => import('./features/admin/content/CareersContentAdmin'));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <Toaster position="top-right" richColors closeButton />
          <Routes>
            {/* Public routes - shared Navbar + Footer via PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/fleet" element={<FleetPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/careers/apply/:id" element={<JobApplicationForm />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:slug" element={<ArticlePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
            </Route>

            {/* Login - no layout */}
            <Route path="/system-access" element={<LoginPage />} />

            {/* Admin routes - shared AdminLayout with Outlet */}
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="news" element={<NewsListAdmin />} />
              <Route path="news/create" element={<NewsFormAdmin />} />
              <Route path="news/edit/:id" element={<NewsFormAdmin />} />
              <Route path="fleet" element={<FleetListAdmin />} />
              <Route path="fleet/create" element={<FleetFormAdmin />} />
              <Route path="fleet/edit/:id" element={<FleetFormAdmin />} />
              <Route path="careers" element={<CareersListAdmin />} />
              <Route path="careers/new" element={<CareersFormAdmin />} />
              <Route path="careers/edit/:id" element={<CareersFormAdmin />} />
              <Route path="content/home" element={<HomeContentAdmin />} />
              <Route path="content/about" element={<AboutContentAdmin />} />
              <Route path="content/services" element={<ServicesContentAdmin />} />
              <Route path="content/careers" element={<CareersContentAdmin />} />
            </Route>

            {/* 404 catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
