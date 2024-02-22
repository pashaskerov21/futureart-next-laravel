import React from 'react'
import { getTranslate } from '@/get-translate';
import { LocaleType } from '@/src/types';
import { Metadata } from 'next';
import { SiteSettingsLayout } from '@/src/admin/layout';

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        const pageTitle = `Admin | ${adminDictionary['site_settings']}`;
        return {
            title: pageTitle,
        };
    } catch (error) {
        return {
            title: 'Admin Panel'
        };
    }
}


const SiteSettings = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        return (
            <>
                <SiteSettingsLayout
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

export default SiteSettings
