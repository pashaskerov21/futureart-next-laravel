'use client'
import React, { useState } from 'react'
import Link from 'next/link';
import { HiMiniBars3 } from "react-icons/hi2";
import { FiSun } from "react-icons/fi";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { LocaleStateType, LocaleType, ReduxRootStateType } from '@/src/types/general/type';
import { AdminUserDataType } from '@/src/types/data/type';

type NavbarProps = {
    activeLocale: LocaleType,
    adminDictionary: { [key: string]: string },
    activeUser: AdminUserDataType | undefined,
    toggleSidebar: () => void,
    handleLogout: () => void,
}

const Navbar: React.FC<NavbarProps> = ({
    activeLocale,
    adminDictionary,
    activeUser,
    toggleSidebar,
    handleLogout,
}) => {
    const [dropdownState, setDropDownState] = useState<{
        profile: boolean,
        language: boolean,
    }>({
        profile: false,
        language: false,
    })
    const handleDropdownToggle = (key: "profile" | "language") => {
        setDropDownState((prev) => {
            return {
                ...prev,
                [key]: !prev[key],
            }
        })
    };

    const adminLocaleStateData: LocaleStateType[] = useSelector((state: ReduxRootStateType) => state.localeState.admin);
    return (
        <div className="navbar-custom">
            <div className="topbar container-fluid">
                <div className="d-flex align-items-center gap-lg-2 gap-1">
                    <button className="button-toggle-menu d-xl-none" onClick={toggleSidebar}>
                        <HiMiniBars3 />
                    </button>
                </div>
                <ul className="topbar-menu d-flex align-items-center gap-3">
                    <li className="dropdown">
                        <div className={`nav-link dropdown-toggle arrow-none ${dropdownState.language ? 'show' : ''}`} onClick={() => handleDropdownToggle('language')}>
                            <img src={`/admin/flag/${activeLocale}.png`} alt="user-image" className="me-0 me-sm-1" height="22" />
                            <span className="align-middle d-none d-lg-inline-block">{adminDictionary[`${activeLocale}`]}</span>
                            <HiChevronDown className='d-none d-sm-inline-block align-middle' />
                        </div>
                        <div className={`dropdown-menu dropdown-menu-end dropdown-menu-animated ${dropdownState.language ? 'show' : ''}`}
                            style={dropdownState.language ? { position: 'absolute', inset: '0px 0px auto auto', margin: '0px', transform: 'translate3d(0.5px, 72px, 0px)' } : {}}
                        >
                            {
                                adminLocaleStateData.filter((data) => data.locale !== activeLocale).map((data) => (
                                    <Link href={`/${data.locale}/${data.slug}`} locale={data.locale} className="dropdown-item" key={data.locale}>
                                        <img src={`/admin/flag/${data.locale}.png`} alt="user-image" className="me-1" height="22" />
                                        <span className="align-middle">{adminDictionary[`${data.locale}`]}</span>
                                    </Link>
                                ))
                            }
                        </div>
                    </li>
                    {
                        activeUser && (
                            <li className="dropdown">
                                <div className={`nav-link dropdown-toggle arrow-none nav-user px-2 ${dropdownState.profile ? 'show' : ''}`} onClick={() => handleDropdownToggle('profile')}>
                                    <span className="account-user-avatar">
                                        <img src="/admin/avatar-1.jpg" alt="user-image" width="32" className="rounded-circle" />
                                    </span>
                                    <span className="d-lg-flex flex-column gap-1 d-none">
                                        <h5 className="my-0">{activeUser.name}</h5>
                                        <h6 className="my-0 fw-normal">{activeUser.user_type}</h6>
                                    </span>
                                </div>
                                <div className={`dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown ${dropdownState.profile ? 'show' : ''}`}
                                    style={dropdownState.profile ? { position: 'absolute', inset: '0px 0px auto auto', margin: '0px', transform: 'translate3d(0px, 72px, 0px)' } : {}}
                                >
                                    <Link href={`/${activeLocale}/admin/dashboard/account`} className="dropdown-item" onClick={() => handleDropdownToggle('profile')}>
                                        <RiAccountCircleFill className='me-1' />
                                        <span>{adminDictionary['my_account']}</span>
                                    </Link>

                                    <div className="dropdown-item" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                                        <MdLogout className='me-1' />
                                        <span>{adminDictionary['logout']}</span>
                                    </div>
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    )
}

export default Navbar
