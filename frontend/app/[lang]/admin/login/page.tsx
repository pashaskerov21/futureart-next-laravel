import React from 'react'
import { UserLoginForm } from '@/src/admin/form';
import { getTranslate } from '@/get-translate';
import { LocaleType } from '@/src/types/general/type';


const AdminLogin = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
    try {
        const t = await getTranslate(lang);
        const adminDictionary = t.admin;
        return (
            <>
                <UserLoginForm
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

export default AdminLogin
