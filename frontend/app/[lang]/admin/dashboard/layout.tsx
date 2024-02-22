import React, { lazy } from 'react'
import { LocaleType } from '@/src/types';
import { getTranslate } from '@/get-translate';
import { Metadata } from 'next';
import { AdminMainLayout } from '@/src/admin/layout';

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        const pageTitle = adminDictionary['dashboard'];
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


const AdminLayout = async ({ children, params: { lang } }: { children: React.ReactNode; params: { lang: LocaleType }; }) => {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        return (
            <AdminMainLayout
                activeLocale={lang}
                adminDictionary={adminDictionary}
            >
                {children}
            </AdminMainLayout>
        )
    } catch {
        return (
            <></>
        )
    }
}

export default AdminLayout
