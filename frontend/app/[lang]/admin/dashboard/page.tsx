import React from 'react'
import { LocaleType } from '@/src/types'
import { AdminDashboardLayout } from '@/src/admin/layout'
import { getTranslate } from '@/get-translate';


const AdminDashboard = async ({ params: { lang } }: { params: { lang: LocaleType } }) => {
  try {
    const t = await getTranslate(lang);
    const adminDictionary = t.admin;
    return (
      <AdminDashboardLayout activeLocale={lang} adminDictionary={adminDictionary} />
    )
  } catch {
    return (
      <></>
    )
  }
}

export default AdminDashboard
