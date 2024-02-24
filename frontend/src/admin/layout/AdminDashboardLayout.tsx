'use client'
import React, { useEffect } from 'react'
import { i18n } from '@/i18n-config';
import { updateAdminLocaleSlug } from '@/src/redux/actions/LocaleAction';
import { useDispatch } from 'react-redux';
import { LocaleStateType, LocaleType } from '@/src/types/general/type';

type LayoutProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
}

const AdminDashboardLayout: React.FC<LayoutProps> = ({ activeLocale, adminDictionary, }) => {
    const path = 'admin/dashboard';
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    useEffect(() => {
        dispatch(updateAdminLocaleSlug(localeSlugs))
    }, [dispatch]);

    

    return (
        <div className="row">
            <div className="col-12">
                <div className="page-title-box">
                    <h4 className="page-title">{adminDictionary['dashboard']}</h4>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboardLayout
