import React from 'react'
import { getTranslate } from '@/get-translate';
import { Metadata } from 'next';
import AdminAccountLayout from '@/src/admin/layout/AdminAccountLayout';
import { LocaleType } from '@/src/types/general/type';

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        const pageTitle = `Admin | ${adminDictionary['my_account']}`;
        return {
            title: pageTitle,
        };
    } catch (error) {
        return {
            title: 'Admin Panel'
        };
    }
}


const AdminAccount = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        return (
            <AdminAccountLayout activeLocale={lang} adminDictionary={adminDictionary} />
        )
    } catch {
        return (
            <></>
        )
    }
}

export default AdminAccount
