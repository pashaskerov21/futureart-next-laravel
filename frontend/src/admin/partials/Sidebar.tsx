import { LocaleType } from '@/src/types';
import Link from 'next/link';
import React from 'react'
import { FaXmark } from "react-icons/fa6";
import { HiMiniUsers } from "react-icons/hi2";
import { FaGear } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import sidebarData from './SidebarData';

type SidebarProps = {
  activeLocale: LocaleType,
  adminDictionary: { [key: string]: string },
  toggleSidebar: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
  activeLocale,
  adminDictionary,
  toggleSidebar,
}) => {
  return (
    <div className="leftside-menu menuitem-active">
      <Link href={`/${activeLocale}/admin/dashboard`} className="logo logo-light">
        <div className='d-flex justify-content-start align-items-center py-3'>
          <img src="/admin/logo-sm.png" alt="small logo" />
          <h3 className='ms-2'>Admin</h3>
        </div>
      </Link>
      <div className="button-close-fullsidebar" onClick={toggleSidebar}>
        <FaXmark />
      </div>
      <ul className="side-nav">
        <li className="side-nav-title">{adminDictionary['navigation']}</li>
        {
          sidebarData.map((data) => (
            <li className="side-nav-item" key={`sidebar-item-${data.id}`}>
              <Link href={`/${activeLocale}/admin/dashboard/${data.url}`} className='side-nav-link d-flex justify-content-start align-items-end'>
                <div className='mx-2' style={{ fontSize: '20px' }}><data.icon /></div>
                <span style={{ lineHeight: '20px' }}> {adminDictionary[`${data.title}`]} </span>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar
