import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ScrollToTop from '../../components/ScrollToTop';
import { PageLoader } from '../../components/common';

const PublicLayout = () => {
  return (
    <>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:text-white focus:font-semibold focus:shadow-lg"
        style={{ backgroundColor: '#003366' }}
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
