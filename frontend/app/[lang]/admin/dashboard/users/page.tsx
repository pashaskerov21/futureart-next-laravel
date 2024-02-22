import React from 'react'
import { getTranslate } from '@/get-translate';
import { LocaleType } from '@/src/types';
import { Metadata } from 'next';
import { AdminUsersIndexLayout } from '@/src/admin/layout';

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        const pageTitle = `Admin | ${adminDictionary['users']}`;
        return {
            title: pageTitle,
        };
    } catch (error) {
        return {
            title: 'Admin Panel'
        };
    }
}


const AdminUsers = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        return (
            <>
                <AdminUsersIndexLayout
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

export default AdminUsers
