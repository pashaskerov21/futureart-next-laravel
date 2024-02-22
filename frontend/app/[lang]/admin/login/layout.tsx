import { getTranslate } from '@/get-translate';
import { AdminLoginLayout } from '@/src/admin/layout';
import { LocaleType } from '@/src/types';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        const pageTitle = adminDictionary['login'];
        return {
            title: pageTitle,
            icons: {
                icon: '/admin/favicon.ico'
            },
        };
    } catch (error) {
        return {
            title: 'Admin Panel'
        };
    }
}

const AdminLogin = ({ children, params: { lang } }: { children: React.ReactNode; params: { lang: LocaleType }; }) => {
    try {
        return (
            <AdminLoginLayout activeLocale={lang}>
                {children}
            </AdminLoginLayout>
        )
    } catch {
        return (
            <></>
        )
    }
}

export default AdminLogin
