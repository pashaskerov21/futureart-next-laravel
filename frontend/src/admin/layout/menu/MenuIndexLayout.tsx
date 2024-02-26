'use client'
import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link';
import { i18n } from '@/i18n-config';
import { updateAdminLocaleSlug } from '@/src/redux/actions/LocaleAction';
import { useDispatch } from 'react-redux';
import { IoChevronForwardSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import { BreadCrumbType, LocaleStateType, LocaleType } from '@/src/types/general/type';
import { MenuDataType, MenuTranslateDataType } from '@/src/types/data/type';
import { Menu } from '../../class';
import { FaPen } from 'react-icons/fa';
import { ReactSortable } from 'react-sortablejs';
import { MdDragIndicator } from "react-icons/md";
import { FiMove } from "react-icons/fi";

type LayoutProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
}

const MenuIndexLayout: React.FC<LayoutProps> = ({ activeLocale, adminDictionary }) => {
    const path: string = 'admin/dashboard/menu';
    const title: string = adminDictionary['menu'];
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
    const menu = new Menu();
    const [menuData, setMenuData] = useState<MenuDataType[]>();
    const [menuTranslateData, setMenuTranslateData] = useState<MenuTranslateDataType[]>();

    useEffect(() => {
        const fetchData = async () => {
            const response: {
                main: MenuDataType[],
                translate: MenuTranslateDataType[],
            } = await menu.all();
            if (response.main && response.translate) {
                setMenuData(response.main);
                setMenuTranslateData(response.translate);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (menuData) {
            let orderArray: number[] = menuData.map((data) => data.order);
            orderArray = orderArray.sort((a, b) => a - b)
            let updateMenuData = menuData.map((data, index) => {
                return {
                    ...data,
                    order: orderArray[index],
                }
            });
            const resultData: Array<{
                id: number,
                order: number,
            }> = updateMenuData.map((data) => {
                return {
                    id: data.id,
                    order: data.order,
                }
            });
            const sortableData = async (data: Array<{
                id: number,
                order: number,
            }>) => {
                const response = await menu.sort(data);
                console.log(response);
            };
            sortableData(resultData);
        }
    }, [menuData]);

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
                menuData && menuTranslateData && (
                    <div className="col-12">
                        <table className="table table-striped table-centered mb-0">
                            <thead>
                                <tr>
                                    <th style={{ width: '150px' }}>#</th>
                                    <th>{adminDictionary['title']}</th>
                                    <th style={{ width: '250px' }}>{adminDictionary['actions']}</th>
                                </tr>
                            </thead>
                            <ReactSortable list={menuData} setList={setMenuData} tag="tbody" >
                                {
                                    menuData.map((data, index) => (
                                        <tr key={data.id}>
                                            <td style={{ width: '150px' }}>{index + 1}</td>
                                            <td>{menu.getTranslate(data.id, activeLocale, "title", menuTranslateData)}</td>
                                            <td style={{ width: '250px' }}>
                                                <div className="table_buttons">
                                                    <Link href={`/${activeLocale}/admin/dashboard/menu/${data.id}`} className='btn btn-success' title={adminDictionary['edit']}><FaPen /></Link>
                                                    <button type="button" className='btn btn-primary order_btn' title={adminDictionary['sort']}>
                                                        <FiMove />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </ReactSortable>
                        </table>
                    </div>
                )
            }
        </>
    )
}

export default React.memo(MenuIndexLayout)
