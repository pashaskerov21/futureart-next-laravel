'use client'
import React, { useCallback, useEffect, useState } from 'react';
import '../assets/css/styles.min.css';
import '../assets/css/custom.css';
import Navbar from '../partials/Navbar';
import Sidebar from '../partials/Sidebar';
import { Provider } from 'react-redux';
import store from '@/src/redux/store';
import { useSessionStorage } from 'usehooks-ts';
import { usePathname, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { User } from '../class';
import { LocaleType } from '@/src/types/general/type';
import { AdminUserDataType } from '@/src/types/data/type';

type LayoutProps = {
  activeLocale: LocaleType,
  children: React.ReactNode,
  adminDictionary: { [key: string]: string },
}

const AdminMainLayout: React.FC<LayoutProps> = ({ activeLocale, children, adminDictionary, }) => {
  const router = useRouter();
  const pathName = usePathname();
  const user = new User();
  const [apiToken, setApiToken] = useSessionStorage<string | null>('token', null);
  const [activeUser, setActiveUser] = useState<AdminUserDataType>();

  const [loading, setLoading] = useState<boolean>(true);
  const [sideNavSize, setSideNavSize] = useState<string>('full');
  const [sidebarShow, setSidebarShow] = useState<boolean>(false);
  const toggleSidebar = useCallback(() => {
    setSidebarShow(prevSidebarShow => !prevSidebarShow);
  }, [setSidebarShow]);

  const handleLogout = useCallback(() => {
    Swal.fire({
      icon: "warning",
      title: adminDictionary["attention"],
      text: adminDictionary["logout_warning"],
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: true,
      confirmButtonText: adminDictionary["yes"],
      denyButtonText: adminDictionary["no"],
      cancelButtonText: adminDictionary["cancel"]
    }).then((result) => {
      if (result.isConfirmed) {
        setApiToken(null);
        router.push(`/${activeLocale}/admin/login`);
      }
    });
  }, [adminDictionary, router, setApiToken, activeLocale]);

  useEffect(() => {
    function handleResize() {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 768) {
        setSideNavSize('full');
      } else if (screenWidth <= 1198) {
        setSideNavSize('condensed');
      } else {
        setSideNavSize('default');
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setLoading(false)
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (apiToken && apiToken !== null) {
          const response: AdminUserDataType | 'error_token' = await user.active(apiToken);
          if (response === 'error_token') {
            router.push(`/${activeLocale}/admin/login`);
          } else {
            setActiveUser(response);
          }
        } else {
          router.push(`/${activeLocale}/admin/login`);
        }
      } catch {
        router.push(`/${activeLocale}/admin/login`);
      }
    };

    fetchData();
  }, [apiToken, pathName]);
  return (
    <html lang={activeLocale}
      data-bs-theme='dark'
      data-menu-color="dark"
      data-topbar-color="light"
      data-layout-mode="fluid"
      data-layout-position="fixed"
      data-sidenav-size={sidebarShow ? 'full' : sideNavSize}
      className={`menuitem-active ${sidebarShow ? 'sidebar-enable' : ''}`}>
      <body>
        <Provider store={store}>
          {
            loading ? (
              <div id="preloader">
                <div id="status">
                  <div className="bouncing-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className='wrapper'>
                <Navbar
                  activeLocale={activeLocale}
                  adminDictionary={adminDictionary}
                  activeUser={activeUser}
                  toggleSidebar={toggleSidebar}
                  handleLogout={handleLogout}
                />
                <Sidebar
                  activeLocale={activeLocale}
                  adminDictionary={adminDictionary}
                  toggleSidebar={toggleSidebar} />
                <div className="content-page">
                  <div className="content">
                    <div className="container-fluid">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            )
          }
          {sidebarShow && <div id="custom-backdrop" className="offcanvas-backdrop fade show" onClick={toggleSidebar}></div>}
        </Provider>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossOrigin="anonymous"></script>
      </body>
    </html>
  )
}

export default AdminMainLayout
