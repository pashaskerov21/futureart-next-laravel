import React from 'react'
import { getTranslate } from '@/get-translate';
import { LocaleType } from '@/src/types';
import { Metadata } from 'next';
import { AdminUsersAddLayout } from '@/src/admin/layout';

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        const pageTitle = `Admin | ${adminDictionary['add']}`;
        return {
            title: pageTitle,
        };
    } catch (error) {
        return {
            title: 'Admin Panel'
        };
    }
}


const AdminUsersAdd = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        return (
            <>
                <AdminUsersAddLayout
                    activeLocale={lang}
                    adminDictionary={adminDictionary}
                />
            </>
        )
    } catch {
        return (
            <></>
        )
    }
}

export default AdminUsersAdd
