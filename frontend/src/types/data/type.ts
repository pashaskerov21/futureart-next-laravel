import { LocaleType } from "../general/type"

type AdminUserDataType = {
    id: 1,
    name: string,
    email: string,
    email_verified_at: string,
    user_type: string,
    api_token: string,
    created_at: string,
    updated_at: string,
}
type SiteSettingDataType = {
    id?: number,
    logo: string | null,
    logo_white: string | null,
    favicon: string | null,
    pdf: string | null,
    mail: string | null,
    phone: string | null,
    hot_line: string | null,
    facebook: string | null,
    linkedin: string | null,
    twitter: string | null,
    instagram: string | null,
    youtube: string | null,
    author_url: string | null,
}

type SiteSettingTranslateDataType = {
    id?: number,
    setting_id?: number | null,
    lang: LocaleType,
    title: string | null,
    description: string | null,
    author: string | null,
    keywords: string | null,
    copyright: string | null,
}

type MenuDataType = {
    id: number,
    slug: string,
    order: number,
}
type MenuTranslateDataType = {
    id: number,
    menu_id: number,
    lang: LocaleType,
    title: string,
}

export type {
    AdminUserDataType,
    SiteSettingDataType,
    SiteSettingTranslateDataType,
    MenuDataType,
    MenuTranslateDataType,
}