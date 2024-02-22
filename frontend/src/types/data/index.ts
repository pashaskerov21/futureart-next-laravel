import { LocaleType } from ".."

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
    id: number,
    logo: string,
    logo_white: string,
    favicon: string,
    mail: string,
    phone: string,
    hot_line: string,
    facebook: string,
    linkedin: string,
    twitter: string,
    instagram: string,
    youtube: string,
    author_url: string,
    pdf: string,
}
type SiteSettingTranslateDataType = {
    id: number,
    setting_id: number,
    lang: LocaleType,
    title: string,
    description: string,
    author: string,
    keywords: string,
    copyright: string,
}


export type {
    AdminUserDataType,
    SiteSettingDataType,
    SiteSettingTranslateDataType,
}