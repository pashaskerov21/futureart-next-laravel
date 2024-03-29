'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import { i18n } from '@/i18n-config';
import { updateAdminLocaleSlug } from '@/src/redux/actions/LocaleAction';
import { useDispatch } from 'react-redux';
import { IoChevronForwardSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { Settings, User } from '../../class';
import { SiteSettingEditForm } from '../../form';
import { BreadCrumbType, LocaleStateType, LocaleType } from '@/src/types/general/type';
import { SiteSettingDataType, SiteSettingTranslateDataType } from '@/src/types/data/type';

type LayoutProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
}

const SiteSettingsLayout: React.FC<LayoutProps> = ({ activeLocale, adminDictionary }) => {
    const path: string = 'admin/dashboard/settings';
    const title: string = adminDictionary['site_settings'];
    const dispatch = useDispatch();
    const localeSlugs: LocaleStateType[] = i18n.locales.map((locale) => {
        return {
            locale: locale,
            slug: path,
        }
    });
    const breadcrumbs: BreadCrumbType[] = [
        {
            id: 1,
            title: adminDictionary['dashboard'],
            url: `/${activeLocale}/admin/dashboard`,
        },
        {
            id: 2,
            title: title,
            url: `/${activeLocale}/${path}`,
        }
    ]
    useEffect(() => {
        dispatch(updateAdminLocaleSlug(localeSlugs))
    }, [dispatch]);


    const router = useRouter();
    const setting = new Settings();

    const [settingsData, setSettingsData] = useState<SiteSettingDataType>();
    const [settingsTranslateData, setSettingsTranslateData] = useState<SiteSettingTranslateDataType[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                main: SiteSettingDataType,
                translate: SiteSettingTranslateDataType[]
            } = await setting.active(1);
            if (response) {
                setSettingsData(response.main);
                setSettingsTranslateData(response.translate);
            }
        }
        fetchData();
    }, []);

   

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                {
                                    breadcrumbs.map((data, index) => (
                                        <Fragment key={`breadcrumb-${data.id}`}>
                                            {
                                                breadcrumbs.length - 1 === index ? (
                                                    <li className="breadcrumb-item active">{title}</li>
                                                ) : (
                                                    <li className="breadcrumb-item" >
                                                        <Link href={data.url}>{data.title}</Link>
                                                        <IoChevronForwardSharp />
                                                    </li>
                                                )
                                            }
                                        </Fragment>
                                    ))
                                }
                            </ol>
                        </div>
                        <h4 className="page-title">{title}</h4>
                    </div>
                </div>
            </div >
            {
                settingsData && settingsTranslateData && settingsTranslateData.length === i18n.locales.length && (
                    <SiteSettingEditForm
                        activeLocale={activeLocale}
                        adminDictionary={adminDictionary}
                        settingsData={settingsData}
                        settingsTranslateData={settingsTranslateData}
                    />
                )
            }
        </>
    )
}

export default React.memo(SiteSettingsLayout)
