import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AdminSidebar, AdminHeader } from '../../components/admin';
import { PageLoader } from '../../components/common';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      <div
        className="flex-1 flex flex-col overflow-hidden"
        onClick={() => {
          if (sidebarOpen && window.innerWidth < 768) {
            closeSidebar();
          }
        }}
      >
        <AdminHeader onMenuClick={toggleSidebar} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
