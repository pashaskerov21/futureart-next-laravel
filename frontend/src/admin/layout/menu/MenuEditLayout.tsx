'use client'
import React, { Fragment, useEffect } from 'react'
import Link from 'next/link';
import { i18n } from '@/i18n-config';
import { updateAdminLocaleSlug } from '@/src/redux/actions/LocaleAction';
import { useDispatch } from 'react-redux';
import { IoChevronForwardSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { BreadCrumbType, LocaleStateType, LocaleType } from '@/src/types/general/type';
import { Menu } from '../../class';
import { MenuDataType, MenuTranslateDataType } from '@/src/types/data/type';
import { MenuEditForm } from '../../form';


type LayoutProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
    menuData: MenuDataType,
    menuTranslateData: MenuTranslateDataType[],
}

const MenuEditLayout: React.FC<LayoutProps> = ({ activeLocale, adminDictionary, menuData, menuTranslateData }) => {
    const path: string = `admin/dashboard/menu/${menuData.id}`;
    const title: string = `${adminDictionary['menu']} ${adminDictionary['edit']}`;
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
            title: adminDictionary['menu'],
            url: `/${activeLocale}/admin/dashboard/menu`,
        },
        {
            id: 3,
            title: title,
            url: `/${activeLocale}/${path}`,
        }
    ]
    useEffect(() => {
        dispatch(updateAdminLocaleSlug(localeSlugs))
    }, [dispatch]);


    const router = useRouter();
    const menu = new Menu();


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
            <MenuEditForm
                activeLocale={activeLocale}
                adminDictionary={adminDictionary}
                menuData={menuData}
                menuTranslateData={menuTranslateData}
            />
        </>
    )
}

export default React.memo(MenuEditLayout)
