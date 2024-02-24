'use client'
import React, { useEffect, useState } from 'react';
import '../assets/css/styles.min.css';
import '../assets/css/custom.css';
import { useSessionStorage } from 'usehooks-ts';
import { LocaleType } from '@/src/types/general/type';

type LayoutProps = {
  activeLocale: LocaleType,
  children: React.ReactNode,
}

const AdminLoginLayout: React.FC<LayoutProps> = ({
  activeLocale,
  children,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [apiToken, setApiToken] = useSessionStorage<string | null>('token', null);

  useEffect(() => {
    setLoading(false);
    setApiToken(null)
  }, []);
  return (
    <html lang={activeLocale} data-bs-theme="dark">
      <body className="authentication-bg position-relative">
        {loading && (
          <div id="preloader">
            <div id="status">
              <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}
        <div className="position-absolute start-0 end-0 start-0 bottom-0 w-100 h-100">
          <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 800 800'>
            <g fillOpacity='0.22'>
              <circle style={{ fill: 'rgba(var(--ct-primary-rgb), 0.1)' }} cx='400' cy='400' r='600' />
              <circle style={{ fill: 'rgba(var(--ct-primary-rgb), 0.2)' }} cx='400' cy='400' r='500' />
              <circle style={{ fill: 'rgba(var(--ct-primary-rgb), 0.3)' }} cx='400' cy='400' r='300' />
              <circle style={{ fill: 'rgba(var(--ct-primary-rgb), 0.4)' }} cx='400' cy='400' r='200' />
              <circle style={{ fill: 'rgba(var(--ct-primary-rgb), 0.5)' }} cx='400' cy='400' r='100' />
            </g>

          </svg>
        </div>
        {children}
      </body>
    </html>

  )
}

export default AdminLoginLayout
