'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import { i18n } from '@/i18n-config';
import { updateAdminLocaleSlug } from '@/src/redux/actions/LocaleAction';
import { useDispatch } from 'react-redux';
import { IoChevronForwardSharp } from "react-icons/io5";
import { useSessionStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { UserAddForm } from '../../form';
import { User } from '../../class';
import { AdminUserDataType } from '@/src/types/data/type';
import { BreadCrumbType, LocaleStateType, LocaleType } from '@/src/types/general/type';


type LayoutProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
}

const AdminUsersAddLayout: React.FC<LayoutProps> = ({ activeLocale, adminDictionary }) => {
    const path: string = 'admin/dashboard/users/add';
    const title: string = adminDictionary['add'];
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
            title: adminDictionary['users'],
            url: `/${activeLocale}/admin/dashboard/users`,
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
    const user = new User();
    const [apiToken, setApiToken] = useSessionStorage<string | null>('token', null);
    const [adminUsers, setAdminUsers] = useState<AdminUserDataType[]>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (apiToken && apiToken !== null) {
                    const response: AdminUserDataType[] | 'error_token' = await user.all(apiToken);
                    if (response === 'error_token') {
                        router.push(`/${activeLocale}/admin/login`);
                    } else {
                        setAdminUsers(response);
                    }
                } else {
                    router.push(`/${activeLocale}/admin/login`);
                }
            } catch {
                router.push(`/${activeLocale}/admin/login`);
            }
        };

        fetchData();
    }, [apiToken]);
    return (
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
            <div className="col-12">
                {
                    adminUsers && adminUsers.length > 0 && (
                        <UserAddForm
                            activeLocale={activeLocale}
                            adminDictionary={adminDictionary}
                            adminUsers={adminUsers}
                        />
                    )
                }
            </div>
        </div >
    )
}

export default React.memo(AdminUsersAddLayout)
