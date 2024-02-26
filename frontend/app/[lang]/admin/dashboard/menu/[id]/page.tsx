import React from 'react'
import { getTranslate } from '@/get-translate';
import { Metadata } from 'next';
import { LocaleType } from '@/src/types/general/type';
import { MenuEditLayout } from '@/src/admin/layout';
import { Menu } from '@/src/admin/class';
import { MenuDataType, MenuTranslateDataType } from '@/src/types/data/type';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params: { lang } }: { params: { lang: LocaleType } }): Promise<Metadata> {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        const pageTitle = `Admin | ${adminDictionary['menu']} ${adminDictionary['edit']}`;
        return {
            title: pageTitle,
        };
    } catch (error) {
        return {
            title: 'Admin Panel'
        };
    }
}


const SiteMenuEdit = async ({ params: { lang, id } }: { params: { lang: LocaleType, id: number } }) => {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        const menu = new Menu();
        const response: {
            main: MenuDataType,
            translate: MenuTranslateDataType[],
        } | 'invalid_id' = await menu.active(id);
        if (response === 'invalid_id') {
            redirect(`/${lang}/admin/dashboard/menu`);
        } else if (response.main && response.translate) {
            return (
                <>
                    <MenuEditLayout
                        activeLocale={lang}
                        adminDictionary={adminDictionary}
                        menuData={response.main}
                        menuTranslateData={response.translate}
                    />
                </>
            )
        }else{
            redirect(`/${lang}/admin/dashboard/menu`);
        }
    } catch {
        return (
            <></>
        )
    }
}

export default SiteMenuEdit
