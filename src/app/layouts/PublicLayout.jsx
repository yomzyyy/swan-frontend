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
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default PublicLayout;
