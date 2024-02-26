'use client'
import React, { useCallback, useState } from 'react'
import { MenuDataType, MenuTranslateDataType } from '@/src/types/data/type'
import { LocaleType } from '@/src/types/general/type'
import { useRouter } from 'next/navigation'
import { Menu } from '../../class'
import Swal from 'sweetalert2'

type FormProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
    menuData: MenuDataType,
    menuTranslateData: MenuTranslateDataType[],
}

const MenuEditForm: React.FC<FormProps> = ({
    activeLocale,
    adminDictionary,
    menuData,
    menuTranslateData,
}) => {
    const router = useRouter();
    const menu = new Menu();
    const [buttonDisable, setButtonDisable] = useState<boolean>(false);

    const [translateData, setTranslateData] = useState<{
        menu_id: number,
        lang: LocaleType[],
        title: string[],
    }>({
        menu_id: menuData.id,
        lang: menuTranslateData.map((data) => data.lang),
        title: menuTranslateData.map((data) => data.title ?? ''),
    });
    const [errors, setErrors] = useState<{
        title: boolean,
    }>({
        title: false,
    });
    const handleChangeTranslateData = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: "title", activeIndex: number) => {
        const value = event.target.value;
        const allValuesFilled = value.trim() !== '';
        setErrors((prev) => ({
            ...prev,
            [key]: allValuesFilled ? false : true,
        }));
        setTranslateData(prev => ({
            ...prev,
            [key]: prev[key].map((item, index) => index === activeIndex ? value : item)
        }));
    }, [setTranslateData]);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const hasEmptyTitle = translateData.title.some((title) => title === '' || title === null);
        if (hasEmptyTitle) {
            setErrors((prev) => ({
                ...prev,
                title: true,
            }));
        } else {
            setErrors((prev) => ({
                ...prev,
                title: false,
            }));
            const data: {
                id: number,
                translate: {
                    lang: LocaleType[],
                    title: string[],
                },
            } = {
                id: translateData.menu_id,
                translate: {
                    lang: translateData.lang,
                    title: translateData.title,
                }
            }
            const response = await menu.update(data);
            if (response === 'update_success') {
                setButtonDisable(true);
                Swal.fire({
                    icon: "success",
                    title: adminDictionary["congratulations"],
                    text: adminDictionary["save_message"],
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.back();
                    }
                });
            }
        }
    }
    return (
        <div className='card'>
            <div className="card-body">
                <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmit(event)}>
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <ul className="nav nav-pills bg-nav-pills nav-justified mb-3">
                                {
                                    menuTranslateData.map((data, index) => (
                                        <li className="nav-item" key={data.lang}>
                                            <a href={`#tab_${data.lang}`} data-bs-toggle="tab" className={`nav-link rounded-0 ${index === 0 ? 'active' : ''}`}>
                                                <span>{data.lang}</span>
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className="tab-content">
                                {
                                    menuTranslateData.map((data, index) => (
                                        <div key={index} className={`tab-pane show ${index === 0 ? 'active' : ''}`} id={`tab_${data.lang}`}>
                                            <div className='mb-3'>
                                                <label htmlFor={`title_${index}`} className="form-label">{adminDictionary['title']} {data.lang}</label>
                                                <input
                                                    id={`title_${index}`}
                                                    type="text"
                                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                                    value={translateData.title[index]}
                                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeTranslateData(event, "title", index)}
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="mb-3 mb-0">
                                <button disabled={buttonDisable} className="btn btn-primary" type="submit"> {adminDictionary['save']} </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default React.memo(MenuEditForm);
