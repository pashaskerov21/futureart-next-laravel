'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import { i18n } from '@/i18n-config';
import { updateAdminLocaleSlug } from '@/src/redux/actions/LocaleAction';
import { useDispatch } from 'react-redux';
import { IoChevronForwardSharp } from "react-icons/io5";
import { useSessionStorage } from 'usehooks-ts';
import { useRouter } from 'next/navigation';
import { FaPen, FaTrash } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { User } from '../../class';
import Swal from 'sweetalert2';
import { BreadCrumbType, LocaleStateType, LocaleType } from '@/src/types/general/type';
import { AdminUserDataType } from '@/src/types/data/type';

type LayoutProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
}

const AdminUsersIndexLayout: React.FC<LayoutProps> = ({ activeLocale, adminDictionary }) => {
    const path: string = 'admin/dashboard/users';
    const title: string = adminDictionary['users'];
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
    const user = new User();
    const [apiToken, setApiToken] = useSessionStorage<string | null>('token', null);
    const [activeUser, setActiveUser] = useState<AdminUserDataType>();
    const [adminUsers, setAdminUsers] = useState<AdminUserDataType[]>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (apiToken && apiToken !== null) {
                    const responseUser: AdminUserDataType | 'error_token' = await user.active(apiToken);
                    const responseUsers: AdminUserDataType[] | 'error_token' = await user.all(apiToken);
                    if (responseUser === 'error_token') {
                        router.push(`/${activeLocale}/admin/login`);
                    } else {
                        setActiveUser(responseUser);
                    }
                    if (responseUsers === 'error_token') {
                        router.push(`/${activeLocale}/admin/login`);
                    } else {
                        setAdminUsers(responseUsers);
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

    const handleDelete = async (id: number) => {
        Swal.fire({
            icon: "warning",
            title: adminDictionary["attention"],
            text: adminDictionary["delete_warning"],
            showDenyButton: true,
            showCancelButton: false,
            showCloseButton: true,
            confirmButtonText: adminDictionary["yes"],
            denyButtonText: adminDictionary["no"],
            cancelButtonText: adminDictionary["cancel"]
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await user.delete(id);
                if (response === 'delete_complete') {
                    Swal.fire({
                        icon: "success",
                        title: adminDictionary["congratulations"],
                        text: adminDictionary["delete_message"],
                    }).then((result) => {
                        if (result.isConfirmed) {
                            router.refresh();
                        }
                    });
                }
            }
        });

    }
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
                adminUsers && adminUsers.length > 0 && (
                    <div className="row">
                        {
                            activeUser && activeUser.user_type === 'admin' && (
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body py-3">
                                            <Link href={`/${activeLocale}/admin/dashboard/users/add`} className='btn btn-danger'>{adminDictionary['add']} <FaCirclePlus className='ms-1' /></Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        <div className="col-12">
                            <table className="table table-striped table-centered mb-0">
                                <thead>
                                    <tr>
                                        <th style={{ width: '150px' }}>#</th>
                                        <th>{adminDictionary['name']}</th>
                                        <th>{adminDictionary['email']}</th>
                                        <th>{adminDictionary['type']}</th>
                                        <th>{adminDictionary['actions']}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        adminUsers.map((data, index) => (
                                            <tr key={data.id}>
                                                <td style={{ width: '150px' }}>{index + 1}</td>
                                                <td>{data.name}</td>
                                                <td>{data.email}</td>
                                                <td>{data.user_type}</td>
                                                <td>
                                                    {
                                                        <div className="table_buttons">

                                                            {
                                                                activeUser && (
                                                                    <Fragment>
                                                                        {
                                                                            data.id === activeUser.id && (
                                                                                <Fragment>
                                                                                    <Link href={`/${activeLocale}/admin/dashboard/account`} title={adminDictionary['edit']} className='btn btn-success'><FaPen /></Link>
                                                                                </Fragment>
                                                                            )
                                                                        }
                                                                        {
                                                                            activeUser.user_type === 'admin' && data.id !== activeUser.id && (
                                                                                <Fragment>
                                                                                    <button type='button' className='btn btn-danger' title={adminDictionary['delete']} onClick={() => handleDelete(data.id)}><FaTrash /></button>
                                                                                </Fragment>
                                                                            )
                                                                        }
                                                                    </Fragment>
                                                                )
                                                            }
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }

        </>
    )
}

export default React.memo(AdminUsersIndexLayout)
